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

  const title = assignment.generatedPaper?.title
    || (assignment.additionalInstructions
      ? assignment.additionalInstructions.slice(0, 50) + (assignment.additionalInstructions.length > 50 ? '...' : '')
      : `Assignment - ${assignment.totalQuestions} Questions`);

  const assignedDate = format(new Date(assignment.createdAt), 'dd-MM-yyyy');
  const dueDate = format(new Date(assignment.dueDate), 'dd-MM-yyyy');

  return (
    <div className="bg-white/75 lg:bg-white rounded-3xl p-5 lg:p-6 hover:shadow-md transition-all relative">
      <div className="flex items-start justify-between">
        <h3
          className="text-lg font-bold lg:text-2xl lg:font-extrabold leading-[120%] tracking-[-0.04em] text-[#303030] cursor-pointer hover:text-[#FF5623] transition-colors pr-8"
          onClick={() => router.push(`/assignment/${assignment._id}`)}
        >
          {title}
        </h3>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 hover:bg-[#F0F0F0] rounded-lg transition-colors">
            <MoreVertical className="w-6 h-6 text-black lg:text-[#A9A9A9]" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-10 bg-white rounded-2xl p-2 z-10 w-[140px] flex flex-col gap-1"
              style={{ boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2), 0px 32px 48px rgba(0, 0, 0, 0.05)' }}
            >
              <button
                onClick={() => { setMenuOpen(false); router.push(`/assignment/${assignment._id}`); }}
                className="w-full text-left px-2 py-1.5 text-sm font-medium text-[#303030] hover:bg-[#F0F0F0] rounded-lg tracking-[-0.04em]"
              >
                View Assignment
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete(assignment._id); }}
                className="w-full text-left px-2 py-1.5 text-sm font-medium text-[#C53535] bg-[#F6F6F6] hover:bg-[#EEEEEE] rounded-lg tracking-[-0.04em]"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 lg:mt-10 text-base text-[#303030] tracking-[-0.04em]">
        <span><strong>Assigned on :</strong> {assignedDate}</span>
        <span><strong>Due :</strong> {dueDate}</span>
      </div>
    </div>
  );
}
