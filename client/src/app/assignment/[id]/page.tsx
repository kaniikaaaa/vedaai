'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, RefreshCw, Sparkles } from 'lucide-react';
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

  // Connect WebSocket
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
      <div className="p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-96 w-full" />
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
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
      {/* Left Panel - AI Message */}
      <div className="lg:w-80 xl:w-96 bg-gray-900 text-white p-6 flex-shrink-0">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {message || 'Here is your customized Question Paper based on your specifications.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleRegenerate}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Right Panel - Paper */}
      <div className="flex-1 p-4 lg:p-8 overflow-auto bg-gray-50">
        {paper ? (
          <PaperView paper={paper} />
        ) : (
          <div className="text-center py-20 text-gray-500">
            No paper data available
          </div>
        )}
      </div>
    </div>
  );
}
