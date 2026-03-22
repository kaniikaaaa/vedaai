'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, LayoutGrid, ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export default function TopBar() {
  const router = useRouter();

  return (
    <header className="hidden lg:flex h-14 bg-white/75 backdrop-blur-sm rounded-2xl items-center justify-between px-3 sticky top-3 z-20 mx-3 mt-3">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-white rounded-full transition-shadow hover:shadow">
          <ArrowLeft className="w-6 h-6 text-[#303030]" />
        </button>
        <div className="flex items-center gap-2 text-[#A9A9A9]">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-base font-semibold tracking-[-0.04em]">Assignment</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center bg-[#F6F6F6] rounded-full relative">
          <Bell className="w-6 h-6 text-[#303030]" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF5623] rounded-full" />
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ filter: 'drop-shadow(0px 16px 48px rgba(0, 0, 0, 0.12)) drop-shadow(0px 32px 48px rgba(0, 0, 0, 0.2))' }}
        >
          <img src="/user-avatar.svg" alt="User" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-base font-semibold text-[#303030] tracking-[-0.04em]">{APP_CONFIG.userName}</span>
          <ChevronDown className="w-6 h-6 text-[#303030]" />
        </button>
      </div>
    </header>
  );
}
