'use client';

import { Menu, Bell } from 'lucide-react';
import VedaLogo from '@/components/ui/VedaLogo';

export default function MobileTopBar() {
  return (
    <header className="lg:hidden h-14 bg-white rounded-2xl flex items-center justify-between px-4 sticky top-2.5 z-20 mx-2.5 mt-2.5">
      <VedaLogo size="sm" variant="dark" />
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center bg-[#F6F6F6] rounded-full relative">
          <Bell className="w-6 h-6 text-[#303030]" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF5623] rounded-full" />
        </button>
        <img src="/user-avatar.svg" alt="User" className="w-8 h-8 rounded-full object-cover" />
        <button className="p-1">
          <Menu className="w-6 h-6 text-[#1D1B20]" />
        </button>
      </div>
    </header>
  );
}
