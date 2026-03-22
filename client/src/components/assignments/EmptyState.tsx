'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <img src="/empty-illustration.svg" alt="No assignments" className="w-[300px] h-[300px] -mb-4" />
      <h2 className="text-xl font-bold text-[#303030] mb-1 tracking-[-0.04em]">No assignments yet</h2>
      <p className="text-base text-[#5E5E5ECC] text-center max-w-[486px] mb-8 leading-[140%] tracking-[-0.04em]">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>
      <Link
        href="/create"
        className="flex items-center gap-1 px-6 py-3 bg-[#181818] hover:bg-[#272727] text-white rounded-[48px] font-medium text-base tracking-[-0.04em] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Create Your First Assignment
      </Link>
    </div>
  );
}
