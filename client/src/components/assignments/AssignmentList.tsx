'use client';

import { useState } from 'react';
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { Assignment } from '@/types';
import AssignmentCard from './AssignmentCard';
import DeleteModal from '@/components/ui/DeleteModal';
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
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <h1 className="text-xl font-bold text-gray-900">Assignments</h1>
        </div>
        <p className="text-sm text-gray-500 ml-5">Manage and create assignments for your classes.</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-200 rounded-lg bg-white">
          <Filter className="w-4 h-4" />
          Filter by
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Assignment"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
              <Skeleton className="h-5 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
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

      {/* Floating Create Assignment Button - visible on BOTH desktop and mobile */}
      <div className="fixed bottom-20 lg:bottom-6 left-0 right-0 flex justify-center z-20">
        <Link
          href="/create"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-sm shadow-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
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
