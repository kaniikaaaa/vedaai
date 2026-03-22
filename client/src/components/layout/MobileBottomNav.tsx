'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, BookOpen, Sparkles, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Assignments', href: '/', icon: FileText },
  { label: 'Library', href: '#', icon: BookOpen },
  { label: 'AI Toolkit', href: '#', icon: Sparkles },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-[11px] left-2.5 right-2.5 z-30 flex flex-col items-end gap-3">
      {/* FAB */}
      <Link
        href="/create"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-2"
        style={{ boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)' }}
      >
        <Plus className="w-5 h-5 text-[#FF5623]" />
      </Link>

      {/* Nav Bar */}
      <nav
        className="w-full h-[72px] bg-[#181818] rounded-3xl flex items-center justify-between px-6"
        style={{ boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)' }}
      >
        {tabs.map((tab) => {
          const isActive = tab.label === 'Assignments' && (pathname === '/' || pathname === '');
          return (
            <Link
              key={tab.label}
              href={tab.href}
              scroll={false}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-[52px] h-[52px] rounded-[26px]',
                isActive ? 'text-white' : 'text-white/25'
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[-0.04em]">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
