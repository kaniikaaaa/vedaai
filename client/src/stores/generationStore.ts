import { create } from 'zustand';
import type { AssignmentStatus, GeneratedPaper } from '@/types';

interface GenerationStore {
  status: AssignmentStatus;
  message: string;
  paper: GeneratedPaper | null;
  setAll: (data: { status: AssignmentStatus; message?: string; paper?: GeneratedPaper | null }) => void;
  reset: () => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  status: 'pending',
  message: '',
  paper: null,
  setAll: (data) => set({ status: data.status, message: data.message || '', paper: data.paper || null }),
  reset: () => set({ status: 'pending', message: '', paper: null }),
}));
