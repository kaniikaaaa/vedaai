import { Loader2 } from 'lucide-react';

interface GeneratingStateProps {
  status: 'pending' | 'processing';
}

export default function GeneratingState({ status }: GeneratingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 mb-6 relative">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {status === 'pending' ? 'Queued for generation...' : 'Generating your question paper...'}
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {status === 'pending'
          ? 'Your assignment is in the queue. Generation will start shortly.'
          : 'AI is creating questions based on your specifications. This may take a minute.'}
      </p>
    </div>
  );
}
