'use client';

import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <MobileTopBar />
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <MobileBottomNav />
      </div>
    </>
  );
}
