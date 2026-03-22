'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Groups', href: '#', icon: Users },
  { label: 'Library', href: '#', icon: BookOpen },
  { label: 'AI Toolkit', href: '#', icon: Sparkles },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-gray-900 rounded-2xl shadow-lg z-30">
      <div className="flex items-center justify-around py-3">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' && pathname === '/';
          return (
            <Link
              key={tab.label}
              href={tab.href}
              scroll={false}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-3',
                isActive ? 'text-white font-bold' : 'text-gray-400'
              )}
            >
              <tab.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
