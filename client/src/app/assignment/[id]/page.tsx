'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGenerationStore } from '@/stores/generationStore';
import { useGenerationSocket } from '@/hooks/useGenerationSocket';
import PaperView from '@/components/paper/PaperView';
import GeneratingState from '@/components/paper/GeneratingState';
import Skeleton from '@/components/ui/Skeleton';
import * as api from '@/lib/api';
import type { Assignment } from '@/types';

export default function AssignmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const { status, message, paper, setAll, reset } = useGenerationStore();

  useGenerationSocket(id);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.fetchAssignment(id);
        setAssignment(data);
        setAll({
          status: data.status,
          message: data.aiMessage,
          paper: data.generatedPaper,
        });
      } catch {
        toast.error('Failed to load assignment');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => reset();
  }, [id, setAll, reset]);

  const handleRegenerate = async () => {
    try {
      await api.regenerateAssignment(id);
      setAll({ status: 'pending', message: '', paper: null });
      toast.success('Regenerating paper...');
    } catch {
      toast.error('Failed to regenerate');
    }
  };

  const handleDownload = async () => {
    if (!paper) return;
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: PaperPDF } = await import('@/components/paper/PaperPDF');
      const blob = await pdf(<PaperPDF paper={paper} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `question-paper-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Failed to generate PDF');
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <Skeleton className="h-20 w-full mb-4 rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (status === 'pending' || status === 'processing') {
    return <GeneratingState status={status} />;
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">!</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Generation Failed</h2>
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">{message}</p>
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-5">
      <div className="bg-[#5E5E5E] rounded-[32px] p-5">
        {/* Banner */}
        <div className="bg-[#181818]/80 rounded-[32px] px-6 py-6 lg:px-8 mb-3">
          <p className="text-xl font-bold text-white leading-[140%] tracking-[-0.04em] mb-4">
            {message || 'Here is your customized Question Paper based on your specifications.'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-6 py-2.5 text-base font-medium text-[#303030] bg-white rounded-full hover:bg-[#F0F0F0] transition-colors tracking-[-0.04em]"
            >
              <Download className="w-6 h-6" />
              Download as PDF
            </button>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1 px-6 py-2.5 text-base font-medium text-white/60 hover:text-white transition-colors tracking-[-0.04em]"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
          </div>
        </div>

        {/* Paper Content */}
        {paper ? (
          <PaperView paper={paper} />
        ) : (
          <div className="text-center py-20 text-white/50">
            No paper data available
          </div>
        )}
      </div>
    </div>
  );
}
