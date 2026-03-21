'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, LayoutGrid, ChevronDown } from 'lucide-react';

export default function TopBar() {
  const router = useRouter();

  return (
    <header className="hidden lg:flex h-14 bg-white border-b border-gray-200 items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 text-gray-500">
          <LayoutGrid className="w-4 h-4" />
          <span className="text-sm">Assignment</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/user-avatar.svg" alt="User" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
