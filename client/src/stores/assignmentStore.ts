import { create } from 'zustand';
import type { Assignment } from '@/types';
import * as api from '@/lib/api';

interface AssignmentStore {
  assignments: Assignment[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchAssignments: () => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentStore>((set, get) => ({
  assignments: [],
  isLoading: false,
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchAssignments: async () => {
    set({ isLoading: true });
    try {
      const assignments = await api.fetchAssignments();
      set({ assignments });
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAssignment: async (id) => {
    try {
      await api.deleteAssignment(id);
      set({ assignments: get().assignments.filter(a => a._id !== id) });
    } catch (error) {
      console.error('Failed to delete assignment:', error);
      throw error;
    }
  },
}));
