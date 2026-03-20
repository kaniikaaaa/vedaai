import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { buildSystemPrompt, buildUserPrompt } from '../utils/prompt.js';
import { parseAIResponse } from '../utils/parseAIResponse.js';
import type { QuestionTypeConfig, AIResponse } from '../types/index.js';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

function getFileContent(filePath: string): { text?: string; base64Image?: string; mimeType?: string } {
  const ext = path.extname(filePath).toLowerCase();

  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    const imageBuffer = fs.readFileSync(filePath);
    const base64 = imageBuffer.toString('base64');
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
    return { base64Image: base64, mimeType };
  }

  if (ext === '.pdf' || ext === '.docx') {
    // For PDF/DOCX, read as text (basic extraction)
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return { text: content };
    } catch {
      return { text: '[File content could not be extracted]' };
    }
  }

  return {};
}

export async function generatePaper(
  questionTypes: QuestionTypeConfig[],
  additionalInstructions: string,
  uploadedFileUrl?: string
): Promise<AIResponse> {
  let fileContent: string | undefined;
  let imageData: { base64: string; mimeType: string } | undefined;

  if (uploadedFileUrl) {
    const filePath = path.join(process.cwd(), uploadedFileUrl);
    if (fs.existsSync(filePath)) {
      const result = getFileContent(filePath);
      if (result.text) {
        fileContent = result.text;
      } else if (result.base64Image && result.mimeType) {
        imageData = { base64: result.base64Image, mimeType: result.mimeType };
      }
    }
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(questionTypes, additionalInstructions, fileContent);

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (imageData) {
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: userPrompt },
        {
          type: 'image_url',
          image_url: {
            url: `data:${imageData.mimeType};base64,${imageData.base64}`,
          },
        },
      ],
    });
  } else {
    messages.push({ role: 'user', content: userPrompt });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from AI');
  }

  return parseAIResponse(content);
}
