import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: 'VedaAI - AI Assessment Creator',
  description: 'Create AI-powered question papers for your classes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-gray-50">
        <Sidebar />
        <div className="lg:ml-60 min-h-screen flex flex-col">
          <TopBar />
          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
        </div>
        <MobileBottomNav />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
