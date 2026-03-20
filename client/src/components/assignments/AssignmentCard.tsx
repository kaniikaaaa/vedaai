'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import type { Assignment } from '@/types';

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export default function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const title = assignment.additionalInstructions
    ? assignment.additionalInstructions.slice(0, 50) + (assignment.additionalInstructions.length > 50 ? '...' : '')
    : `Assignment - ${assignment.totalQuestions} Questions`;

  const assignedDate = format(new Date(assignment.createdAt), 'dd-MM-yyyy');
  const dueDate = format(new Date(assignment.dueDate), 'dd-MM-yyyy');

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow relative">
      <div className="flex items-start justify-between">
        <h3
          className="text-base font-semibold text-gray-900 cursor-pointer hover:text-orange-600 transition-colors pr-8"
          onClick={() => router.push(`/assignment/${assignment._id}`)}
        >
          {title}
        </h3>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push(`/assignment/${assignment._id}`);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                View Assignment
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(assignment._id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
        <span>Assigned on: {assignedDate}</span>
        <span>Due: {dueDate}</span>
      </div>

      {/* Status indicator */}
      {assignment.status === 'processing' && (
        <div className="mt-3">
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Generating...
          </span>
        </div>
      )}
      {assignment.status === 'completed' && (
        <div className="mt-3">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Completed
          </span>
        </div>
      )}
      {assignment.status === 'failed' && (
        <div className="mt-3">
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
            Failed
          </span>
        </div>
      )}
    </div>
  );
}
