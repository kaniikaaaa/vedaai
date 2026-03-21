'use client';

import { Menu, LayoutGrid, Bell } from 'lucide-react';
import VedaLogo from '@/components/ui/VedaLogo';

export default function MobileTopBar() {
  return (
    <header className="lg:hidden h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
      <VedaLogo size="sm" />
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Menu className="w-5 h-5 text-gray-600" /></button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg"><LayoutGrid className="w-5 h-5 text-gray-600" /></button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Bell className="w-5 h-5 text-gray-600" /></button>
      </div>
    </header>
  );
}
