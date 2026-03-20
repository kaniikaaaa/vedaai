import type { AIResponse } from '../types/index.js';

export function parseAIResponse(raw: string): AIResponse {
  try {
    const parsed = JSON.parse(raw);

    if (!parsed.message || !parsed.paper) {
      throw new Error('Invalid AI response structure: missing message or paper');
    }

    const { paper } = parsed;
    if (!paper.sections || !Array.isArray(paper.sections)) {
      throw new Error('Invalid AI response: paper must have sections array');
    }

    if (!paper.answerKey || !Array.isArray(paper.answerKey)) {
      throw new Error('Invalid AI response: paper must have answerKey array');
    }

    return parsed as AIResponse;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        return parseAIResponse(jsonMatch[1].trim());
      }
      throw new Error('Failed to parse AI response as JSON');
    }
    throw error;
  }
}
