'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, LayoutGrid, ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export default function TopBar() {
  const router = useRouter();

  return (
    <header className="hidden lg:flex h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm items-center justify-between px-5 sticky top-3 z-20 mx-3 mt-3">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:shadow transition-shadow">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 text-gray-500">
          <LayoutGrid className="w-4 h-4" />
          <span className="text-sm">Assignment</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 bg-white rounded-full shadow-sm hover:shadow transition-shadow relative">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center gap-2 bg-white rounded-full pl-1.5 pr-3 py-1.5 shadow-sm hover:shadow transition-shadow">
          <img src="/user-avatar.svg" alt="User" className="w-7 h-7 rounded-full object-cover" />
          <span className="text-sm font-medium text-gray-700">{APP_CONFIG.userName}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
