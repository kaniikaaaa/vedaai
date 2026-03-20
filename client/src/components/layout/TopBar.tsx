'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, Bell, LayoutGrid } from 'lucide-react';

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/create') return 'Assignment';
    if (pathname.startsWith('/assignment/')) return 'Assignment';
    return 'Assignment';
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 text-gray-500">
          <LayoutGrid className="w-4 h-4" />
          <span className="text-sm">{getTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-amber-800">JD</span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">John Doe</span>
        </div>
      </div>
    </header>
  );
}
