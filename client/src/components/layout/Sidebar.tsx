'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  FileText,
  Sparkles,
  BookOpen,
  Settings,
  Plus,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Groups', href: '#', icon: Users },
  { label: 'Assignments', href: '/', icon: FileText, badge: true },
  { label: 'AI Teacher\'s Toolkit', href: '#', icon: Sparkles },
  { label: 'My Library', href: '#', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">VedaAI</span>
      </div>

      {/* Create Button */}
      <div className="px-4 mb-4">
        <Link
          href="/create"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Assignment
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/' && (pathname === '/' || pathname === '');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  02
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 mb-2">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>

      {/* School Card */}
      <div className="mx-4 mb-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-lg">
          🏫
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Delhi Public School</p>
          <p className="text-xs text-gray-500">Bokaro Steel City</p>
        </div>
      </div>
    </aside>
  );
}
