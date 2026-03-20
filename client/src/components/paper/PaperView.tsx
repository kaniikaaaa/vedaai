'use client';

import type { GeneratedPaper } from '@/types';

interface PaperViewProps {
  paper: GeneratedPaper;
}

export default function PaperView({ paper }: PaperViewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 max-w-3xl">
      {/* School Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 mb-1">{paper.schoolName}</h1>
        <p className="text-sm text-gray-700">Subject: {paper.subject}</p>
        <p className="text-sm text-gray-700">Class: {paper.class}</p>
      </div>

      {/* Meta */}
      <div className="flex justify-between text-sm text-gray-700 mb-4">
        <span>Time Allowed: {paper.time}</span>
        <span>Maximum Marks: {paper.maxMarks}</span>
      </div>

      {/* Instructions */}
      {paper.instructions && paper.instructions.length > 0 && (
        <div className="mb-6 p-3 bg-gray-50 border-l-3 border-gray-800 text-sm text-gray-600">
          <p className="font-medium text-gray-900 mb-1">Instructions:</p>
          {paper.instructions.map((inst, i) => (
            <p key={i} className="italic">• {inst}</p>
          ))}
        </div>
      )}

      {/* Sections */}
      {paper.sections.map((section, si) => (
        <div key={si} className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-1 pb-1 border-b border-gray-300">
            {section.title}
          </h3>
          <p className="text-sm text-gray-500 italic mb-4">{section.instruction}</p>

          <div className="space-y-4">
            {section.questions.map((q) => (
              <div key={q.number} className="text-sm">
                <p className="text-gray-800">
                  <strong>{q.number}.</strong> {q.text}{' '}
                  <span className="text-gray-400 text-xs">[{q.marks} Marks]</span>
                </p>
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-2 gap-1 mt-2 ml-5 text-gray-600 text-xs">
                    {q.options.map((opt, oi) => (
                      <span key={oi}>({String.fromCharCode(97 + oi)}) {opt}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* End Divider */}
      <div className="text-center text-sm font-bold text-gray-500 my-6 pt-4 border-t border-gray-300">
        --- End of Question Paper ---
      </div>

      {/* Answer Key */}
      {paper.answerKey && paper.answerKey.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 text-center mb-4">Answer Key</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {paper.answerKey.map((a) => (
              <p key={a.questionNumber}>
                <strong>{a.questionNumber}.</strong> {a.answer}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
