export interface QuestionTypeConfig {
  type: string;
  count: number;
  marks: number;
}

export interface Question {
  number: number;
  text: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: string[];
}

export interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export interface GeneratedPaper {
  schoolName: string;
  subject: string;
  class: string;
  time: string;
  maxMarks: number;
  instructions: string[];
  sections: Section[];
  answerKey: { questionNumber: number; answer: string }[];
}

export type AssignmentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Assignment {
  _id: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  additionalInstructions: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  status: AssignmentStatus;
  generatedPaper?: GeneratedPaper;
  aiMessage?: string;
  totalQuestions: number;
  totalMarks: number;
  createdAt: string;
  updatedAt: string;
}
