'use client';

import { Menu, Bell } from 'lucide-react';
import VedaLogo from '@/components/ui/VedaLogo';

export default function MobileTopBar() {
  return (
    <header className="lg:hidden h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm flex items-center justify-between px-4 sticky top-0 z-20 mx-4 mt-4">
      <VedaLogo size="sm" />
      <div className="flex items-center gap-3">
        <button className="p-2 bg-white rounded-full shadow-sm">
          <Bell className="w-4 h-4 text-gray-600" />
        </button>
        <img src="/user-avatar.svg" alt="User" className="w-8 h-8 rounded-full object-cover shadow-sm" />
        <button className="p-2 bg-white rounded-full shadow-sm">
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
