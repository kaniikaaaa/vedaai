'use client';

import { X, Plus } from 'lucide-react';
import type { QuestionTypeConfig } from '@/types';

const QUESTION_TYPE_OPTIONS = [
  'Multiple Choice Questions',
  'Short Questions',
  'Long Answer Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'True/False',
  'Fill in the Blanks',
  'Match the Following',
  'Case Study',
  'Essay',
];

interface QuestionTypesTableProps {
  questionTypes: QuestionTypeConfig[];
  onUpdate: (index: number, field: keyof QuestionTypeConfig, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  totalQuestions: number;
  totalMarks: number;
}

export default function QuestionTypesTable({
  questionTypes,
  onUpdate,
  onAdd,
  onRemove,
  totalQuestions,
  totalMarks,
}: QuestionTypesTableProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-16 mb-4">
        <div className="flex-1">
          <label className="text-base font-bold text-[#303030] tracking-[-0.04em]">Question Type</label>
        </div>
        <div className="flex gap-4">
          <span className="w-[100px] text-center text-base font-medium text-[#303030] tracking-[-0.04em]">No. of Questions</span>
          <span className="w-[100px] text-center text-base font-medium text-[#303030] tracking-[-0.04em]">Marks</span>
        </div>
      </div>

      <div className="space-y-4">
        {questionTypes.map((qt, index) => (
          <div key={index} className="flex items-center gap-3">
            <select
              value={qt.type}
              onChange={(e) => onUpdate(index, 'type', e.target.value)}
              className="flex-1 px-4 py-2.5 text-base font-medium text-[#303030] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5623] appearance-none tracking-[-0.04em]"
            >
              {QUESTION_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <button
              onClick={() => onRemove(index)}
              className="p-1 text-[#303030] hover:text-[#C53535] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <input
              type="number"
              min={1}
              value={qt.count}
              onChange={(e) => onUpdate(index, 'count', parseInt(e.target.value) || 1)}
              className="w-[100px] px-2 py-2.5 text-base font-medium text-center text-[#303030] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5623] tracking-[-0.04em]"
            />

            <input
              type="number"
              min={1}
              value={qt.marks}
              onChange={(e) => onUpdate(index, 'marks', parseInt(e.target.value) || 1)}
              className="w-[100px] px-2 py-2.5 text-base font-medium text-center text-[#303030] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5623] tracking-[-0.04em]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 mt-4 tracking-[-0.04em]"
      >
        <div className="w-9 h-9 bg-[#2B2B2B] rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-bold text-[#303030]">Add Question Type</span>
      </button>

      <div className="flex flex-col items-end mt-4 gap-2">
        <span className="text-base font-medium text-[#303030] tracking-[-0.04em]">Total Questions : {totalQuestions}</span>
        <span className="text-base font-medium text-[#303030] tracking-[-0.04em]">Total Marks : {totalMarks}</span>
      </div>
    </div>
  );
}
