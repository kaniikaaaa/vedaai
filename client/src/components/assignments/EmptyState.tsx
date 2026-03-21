import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <img src="/empty-illustration.svg" alt="No assignments" className="w-96 h-88 -mb-6" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">No assignments yet</h2>
      <p className="text-sm text-gray-500 text-center max-w-md mb-8 leading-relaxed">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>
      <Link href="/create" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-sm transition-colors">
        <Plus className="w-4 h-4" />
        Create Your First Assignment
      </Link>
    </div>
  );
}
