import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';
import { Toaster } from 'react-hot-toast';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VedaAI - AI Assessment Creator',
  description: 'Create AI-powered question papers for your classes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full`}>
      <body className="min-h-full">
        <ClientShell>{children}</ClientShell>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
