import type { GeneratedPaper } from '@/types';

const DIFFICULTY_STYLES: Record<string, { bg: string; label: string }> = {
  easy: { bg: 'bg-green-100 text-green-700', label: 'Easy' },
  medium: { bg: 'bg-yellow-100 text-yellow-700', label: 'Moderate' },
  hard: { bg: 'bg-red-100 text-red-700', label: 'Hard' },
};

interface PaperViewProps {
  paper: GeneratedPaper;
}

export default function PaperView({ paper }: PaperViewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 mb-1">{paper.schoolName}</h1>
        <p className="text-sm text-gray-700"><strong>Subject:</strong> {paper.subject}</p>
        <p className="text-sm text-gray-700"><strong>Class:</strong> {paper.class}</p>
      </div>

      <div className="flex justify-between text-sm text-gray-700 mb-4">
        <span><strong>Time Allowed:</strong> {paper.time}</span>
        <span><strong>Maximum Marks:</strong> {paper.maxMarks}</span>
      </div>

      {paper.instructions && paper.instructions.length > 0 && (
        <div className="mb-6 p-3 bg-gray-50 border-l-3 border-gray-800 text-sm text-gray-600">
          <p className="font-medium text-gray-900 mb-1">Instructions:</p>
          {paper.instructions.map((inst, i) => (
            <p key={i} className="italic">• {inst}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
        <span>Name: _________________________</span>
        <span>Roll Number: _______________</span>
        <span>Section: _______</span>
        <span>Date: ___/___/______</span>
      </div>

      {paper.sections.map((section, si) => (
        <div key={si} className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-1 pb-1 border-b border-gray-300">{section.title}</h3>
          <p className="text-sm text-gray-500 italic mb-4">{section.instruction}</p>
          <div className="space-y-4">
            {section.questions.map((q) => {
              const diff = q.difficulty ? DIFFICULTY_STYLES[q.difficulty] : null;
              return (
                <div key={q.number} className="text-sm">
                  <p className="text-gray-800">
                    <strong>{q.number}.</strong> {q.text}{' '}
                    <span className="text-gray-400 text-xs">[{q.marks} Marks]</span>
                    {diff && <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${diff.bg}`}>{diff.label}</span>}
                  </p>
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-1 mt-2 ml-5 text-gray-600 text-xs">
                      {q.options.map((opt, oi) => (
                        <span key={oi}>({String.fromCharCode(97 + oi)}) {opt}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="text-center text-sm font-bold text-gray-500 my-6 pt-4 border-t border-gray-300">
        --- End of Question Paper ---
      </div>

      {paper.answerKey && paper.answerKey.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 text-center mb-4">Answer Key</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {paper.answerKey.map((a) => (
              <p key={a.questionNumber}><strong>{a.questionNumber}.</strong> {a.answer}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
