import type { QuestionTypeConfig } from '../types/index.js';

export function buildSystemPrompt(): string {
  return `You are an expert exam paper creator for schools. You create well-structured, pedagogically sound question papers.

Your output must be a valid JSON object with exactly this structure:
{
  "message": "A brief friendly message about the generated paper (1-2 sentences)",
  "paper": {
    "title": "A short title for the paper (e.g., 'Quiz on Electricity', 'Math Unit Test')",
    "schoolName": "School name (infer from context or use a reasonable default)",
    "subject": "Subject name (infer from the content/instructions)",
    "class": "Class/Grade (infer from context)",
    "time": "Time allowed (e.g., '3 Hours')",
    "maxMarks": <total marks as number>,
    "instructions": ["Array of general instructions for students"],
    "sections": [
      {
        "title": "Section A",
        "instruction": "Instructions for this section",
        "questions": [
          {
            "number": 1,
            "text": "Question text",
            "marks": <marks>,
            "difficulty": "easy|medium|hard",
            "options": ["Only for MCQ type - array of 4 options with correct answer marked with (*)"]
          }
        ]
      }
    ],
    "answerKey": [
      { "questionNumber": 1, "answer": "Brief answer or explanation" }
    ]
  }
}

Rules:
- Infer the school name, subject, class/grade from the uploaded content and additional instructions
- Create questions appropriate for the specified class level
- Ensure questions cover different difficulty levels
- MCQ options should have exactly 4 choices with the correct one marked with (*)
- Include clear section instructions
- Answer key must cover ALL questions
- Output ONLY valid JSON, no markdown or extra text`;
}

export function buildUserPrompt(
  questionTypes: QuestionTypeConfig[],
  additionalInstructions: string,
  fileContent?: string
): string {
  const questionConfig = questionTypes
    .map(qt => `- ${qt.type}: ${qt.count} questions, ${qt.marks} marks each`)
    .join('\n');

  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.count, 0);
  const totalMarks = questionTypes.reduce((sum, qt) => sum + qt.count * qt.marks, 0);

  let prompt = `Generate a question paper with the following configuration:

Question Distribution:
${questionConfig}

Total Questions: ${totalQuestions}
Total Marks: ${totalMarks}`;

  if (additionalInstructions) {
    prompt += `\n\nAdditional Instructions from Teacher:
${additionalInstructions}`;
  }

  if (fileContent) {
    prompt += `\n\nContent from uploaded file (use this as reference material for generating questions):
${fileContent}`;
  }

  return prompt;
}
