'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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

  const title = assignment.generatedPaper?.title
    || (assignment.additionalInstructions
      ? assignment.additionalInstructions.slice(0, 50) + (assignment.additionalInstructions.length > 50 ? '...' : '')
      : `Assignment - ${assignment.totalQuestions} Questions`);

  const assignedDate = format(new Date(assignment.createdAt), 'dd-MM-yyyy');
  const dueDate = format(new Date(assignment.dueDate), 'dd-MM-yyyy');

  return (
    <div className={cn('rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all relative', menuOpen ? 'bg-amber-50' : 'bg-white')}>
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900 cursor-pointer hover:text-orange-600 transition-colors pr-8" onClick={() => router.push(`/assignment/${assignment._id}`)}>
          {title}
        </h3>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
              <button onClick={() => { setMenuOpen(false); router.push(`/assignment/${assignment._id}`); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Assignment</button>
              <button onClick={() => { setMenuOpen(false); onDelete(assignment._id); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 text-[13px] text-gray-500">
        <span>Assigned on: {assignedDate}</span>
        <span>Due: {dueDate}</span>
      </div>
    </div>
  );
}
