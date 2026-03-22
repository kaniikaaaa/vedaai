import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { config } from '../config/index.js';
import { buildSystemPrompt, buildUserPrompt } from '../utils/prompt.js';
import { parseAIResponse } from '../utils/parseAIResponse.js';
import type { QuestionTypeConfig, AIResponse } from '../types/index.js';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

async function extractFileText(filePath: string): Promise<string | undefined> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    try {
      const buffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: new Uint8Array(buffer) });
      const result = await parser.getText();
      return result.text.slice(0, 8000);
    } catch {
      return '[PDF content could not be extracted]';
    }
  }

  if (ext === '.txt') {
    try {
      return fs.readFileSync(filePath, 'utf-8').slice(0, 8000);
    } catch {
      return '[File content could not be extracted]';
    }
  }

  return undefined;
}

export async function generatePaper(
  questionTypes: QuestionTypeConfig[],
  additionalInstructions: string,
  uploadedFileUrl?: string
): Promise<AIResponse> {
  let fileContent: string | undefined;

  if (uploadedFileUrl) {
    const filePath = path.join(process.cwd(), uploadedFileUrl);
    if (fs.existsSync(filePath)) {
      fileContent = await extractFileText(filePath);
    }
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(questionTypes, additionalInstructions, fileContent);

  console.log('\n=== LLM REQUEST ===');
  console.log('System prompt length:', systemPrompt.length, 'chars');
  console.log('User prompt:\n', userPrompt);
  console.log('===================\n');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.9,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  console.log('\n=== LLM RESPONSE ===');
  console.log('Tokens used:', response.usage);
  console.log('Response length:', content?.length, 'chars');
  console.log('Raw response:\n', content?.slice(0, 500), '...');
  console.log('====================\n');

  if (!content) {
    throw new Error('No response from AI');
  }

  return parseAIResponse(content);
}
