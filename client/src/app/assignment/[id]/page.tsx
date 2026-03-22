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

  const handleDownload = () => {
    window.open(api.getPDFUrl(id), '_blank');
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
    <div className="p-3 lg:p-4">
      {/* Dark Banner */}
      <div className="bg-gray-900 rounded-2xl p-5 mb-4 text-white">
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {message || 'Here is your customized Question Paper based on your specifications.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download as PDF
          </button>
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-gray-600 rounded-full hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate PDF
          </button>
        </div>
      </div>

      {/* Paper Content */}
      {paper ? (
        <PaperView paper={paper} />
      ) : (
        <div className="text-center py-20 text-gray-500">
          No paper data available
        </div>
      )}
    </div>
  );
}
