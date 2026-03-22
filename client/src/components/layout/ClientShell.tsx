'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPaperPage = pathname.startsWith('/assignment/');

  return (
    <>
      {!isPaperPage && <Sidebar />}
      <MobileTopBar />
      <div className={isPaperPage ? 'min-h-screen flex flex-col' : 'lg:ml-72 min-h-screen flex flex-col'}>
        {!isPaperPage && <TopBar />}
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      {!isPaperPage && <MobileBottomNav />}
    </>
  );
}
