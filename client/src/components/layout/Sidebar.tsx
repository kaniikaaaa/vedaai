'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Sparkles, BookOpen, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';
import { useAssignmentStore } from '@/stores/assignmentStore';
import VedaLogo from '@/components/ui/VedaLogo';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Groups', href: '#', icon: Users },
  { label: 'Assignments', href: '/', icon: FileText, showBadge: true },
  { label: 'AI Teacher\'s Toolkit', href: '#', icon: Sparkles },
  { label: 'My Library', href: '#', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const assignmentCount = useAssignmentStore(s => s.assignments.length);

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-80 p-3 z-30">
      <aside className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-5 py-5">
          <VedaLogo />
        </div>

        <div className="px-4 mb-4">
          <Link
            href="/create"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-sm transition-colors border-2 border-orange-500"
          >
            <Plus className="w-4 h-4" />
            Create Assignment
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = item.label === 'Assignments' && (pathname === '/' || pathname === '');
            return (
              <Link
                key={item.label}
                href={item.href}
                scroll={false}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.showBadge && assignmentCount > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full font-medium px-1">
                    {assignmentCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mb-2">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 w-full">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        <div className="mx-4 mb-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
          <img src="/school-avatar.svg" alt="School" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{APP_CONFIG.schoolName}</p>
            <p className="text-xs text-gray-500">{APP_CONFIG.schoolLocation}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
