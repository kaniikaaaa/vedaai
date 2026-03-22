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
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-[304px] p-3 z-30">
      <aside
        className="flex flex-col h-full bg-white rounded-2xl overflow-hidden p-6"
        style={{ boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)' }}
      >
        <div className="mb-8">
          <VedaLogo />
        </div>

        <div className="mb-6">
          <button
            onClick={() => window.location.href = '/create'}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-base font-medium text-white rounded-full transition-colors tracking-[-0.04em]"
            style={{
              background: '#272727',
              boxShadow: '0px 16px 48px rgba(255, 255, 255, 0.12), 0px 32px 48px rgba(255, 255, 255, 0.2), inset 0px -1px 3.5px rgba(177, 177, 177, 0.6), inset 0px 0px 34.5px rgba(255, 255, 255, 0.25)',
            }}
          >
            <Plus className="w-5 h-5" />
            Create Assignment
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = item.label === 'Assignments' && (pathname === '/' || pathname === '');
            return (
              <Link
                key={item.label}
                href={item.href}
                scroll={false}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-base tracking-[-0.04em] transition-colors',
                  isActive
                    ? 'bg-[#F0F0F0] text-[#303030] font-medium'
                    : 'text-[#5E5E5ECC] hover:bg-[#F0F0F0]'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.showBadge && assignmentCount > 0 && (
                  <span className="ml-auto bg-[#FF5623] text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-lg font-medium px-1.5">
                    {assignmentCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-base text-[#5E5E5ECC] hover:bg-[#F0F0F0] w-full tracking-[-0.04em] mb-2">
            <Settings className="w-5 h-5" />
            Settings
          </button>

          <div className="p-3 bg-[#F0F0F0] rounded-2xl flex items-center gap-2">
            <img src="/school-avatar.svg" alt="School" className="w-14 h-14 rounded-full object-cover" />
            <div>
              <p className="text-base font-bold text-[#303030] tracking-[-0.04em]">{APP_CONFIG.schoolName}</p>
              <p className="text-sm text-[#5E5E5E] tracking-[-0.04em]">{APP_CONFIG.schoolLocation}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
