import { create } from 'zustand';
import type { QuestionTypeConfig } from '@/types';

const getToday = () => new Date().toISOString().split('T')[0];

const DEFAULT_QUESTION_TYPES: QuestionTypeConfig[] = [
  { type: 'Multiple Choice Questions', count: 4, marks: 1 },
  { type: 'Short Questions', count: 3, marks: 2 },
  { type: 'Diagram/Graph-Based Questions', count: 5, marks: 5 },
  { type: 'Numerical Problems', count: 5, marks: 5 },
];

interface CreateStore {
  file: File | null;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  additionalInstructions: string;
  isSubmitting: boolean;

  setFile: (file: File | null) => void;
  setDueDate: (date: string) => void;
  updateQuestionType: (index: number, field: keyof QuestionTypeConfig, value: string | number) => void;
  addQuestionType: () => void;
  removeQuestionType: (index: number) => void;
  setAdditionalInstructions: (text: string) => void;
  setIsSubmitting: (v: boolean) => void;
  getTotalQuestions: () => number;
  getTotalMarks: () => number;
  reset: () => void;
}

export const useCreateStore = create<CreateStore>((set, get) => ({
  file: null,
  dueDate: getToday(),
  questionTypes: [...DEFAULT_QUESTION_TYPES],
  additionalInstructions: '',
  isSubmitting: false,

  setFile: (file) => set({ file }),
  setDueDate: (dueDate) => set({ dueDate }),
  updateQuestionType: (index, field, value) => {
    const types = [...get().questionTypes];
    types[index] = { ...types[index], [field]: value };
    set({ questionTypes: types });
  },

  addQuestionType: () => {
    set({ questionTypes: [...get().questionTypes, { type: 'Essay', count: 1, marks: 5 }] });
  },

  removeQuestionType: (index) => {
    set({ questionTypes: get().questionTypes.filter((_, i) => i !== index) });
  },

  setAdditionalInstructions: (additionalInstructions) => set({ additionalInstructions }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  getTotalQuestions: () => get().questionTypes.reduce((sum, qt) => sum + qt.count, 0),
  getTotalMarks: () => get().questionTypes.reduce((sum, qt) => sum + qt.count * qt.marks, 0),

  reset: () => set({
    file: null,
    dueDate: getToday(),
    questionTypes: [...DEFAULT_QUESTION_TYPES],
    additionalInstructions: '',
    isSubmitting: false,
  }),
}));
