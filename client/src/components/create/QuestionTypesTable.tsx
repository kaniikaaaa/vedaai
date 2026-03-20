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
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-900">Question Type</label>
        <div className="flex gap-12 text-sm font-medium text-gray-900 mr-1">
          <span>No. of Questions</span>
          <span>Marks</span>
        </div>
      </div>

      <div className="space-y-3">
        {questionTypes.map((qt, index) => (
          <div key={index} className="flex items-center gap-3">
            <select
              value={qt.type}
              onChange={(e) => onUpdate(index, 'type', e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white appearance-none"
            >
              {QUESTION_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <button
              onClick={() => onRemove(index)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <input
              type="number"
              min={1}
              value={qt.count}
              onChange={(e) => onUpdate(index, 'count', parseInt(e.target.value) || 1)}
              className="w-16 px-3 py-2.5 text-sm text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="number"
              min={1}
              value={qt.marks}
              onChange={(e) => onUpdate(index, 'marks', parseInt(e.target.value) || 1)}
              className="w-16 px-3 py-2.5 text-sm text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
          <Plus className="w-3.5 h-3.5" />
        </div>
        Add Question Type
      </button>

      <div className="flex flex-col items-end mt-4 text-sm">
        <span className="text-gray-600">Total Questions: <strong className="text-gray-900">{totalQuestions}</strong></span>
        <span className="text-gray-600">Total Marks: <strong className="text-gray-900">{totalMarks}</strong></span>
      </div>
    </div>
  );
}
