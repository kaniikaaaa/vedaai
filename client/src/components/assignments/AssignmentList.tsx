'use client';

import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';
import type { Assignment } from '@/types';
import AssignmentCard from './AssignmentCard';
import DeleteModal from '@/components/ui/DeleteModal';
import PageHeader from '@/components/ui/PageHeader';
import Skeleton from '@/components/ui/Skeleton';

interface AssignmentListProps {
  assignments: Assignment[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function AssignmentList({
  assignments,
  isLoading,
  searchQuery,
  onSearchChange,
  onDelete,
}: AssignmentListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = assignments.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const text = (a.additionalInstructions || '').toLowerCase();
    const title = (a.generatedPaper?.title || '').toLowerCase();
    return text.includes(q) || title.includes(q);
  });

  const handleDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <PageHeader title="Assignments" subtitle="Manage and create assignments for your classes." />

      {/* Search/Filter Bar */}
      <div className="bg-white rounded-[20px] h-16 flex items-center justify-between px-4 gap-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Filter className="w-5 h-5 text-[#A9A9A9]" />
            <span className="text-sm font-normal lg:font-bold text-[#A9A9A9] tracking-[-0.04em]">Filter</span>
          </div>
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9A9A9]" />
          <input
            type="text"
            placeholder="Search Assignment"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 text-sm font-bold text-[#303030] placeholder:text-[#A9A9A9] placeholder:font-bold border border-black/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5623] focus:border-transparent tracking-[-0.04em]"
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6">
              <Skeleton className="h-7 w-3/4 mb-10" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* Floating Create Assignment Button */}
      <div className="hidden lg:flex fixed lg:bottom-6 left-0 right-0 justify-center z-20">
        <Link
          href="/create"
          className="flex items-center gap-1 px-6 py-3 bg-[#181818] hover:bg-[#272727] text-white rounded-[48px] font-medium text-base tracking-[-0.04em] transition-colors"
          style={{ boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)' }}
        >
          <Plus className="w-5 h-5" />
          Create Assignment
        </Link>
      </div>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
