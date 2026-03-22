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
  title: string;
  schoolName: string;
  subject: string;
  class: string;
  time: string;
  maxMarks: number;
  instructions: string[];
  sections: Section[];
  answerKey: { questionNumber: number; answer: string }[];
}

export interface AIResponse {
  message: string;
  paper: GeneratedPaper;
}

export type AssignmentStatus = 'pending' | 'processing' | 'completed' | 'failed';
