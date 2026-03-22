import type { GeneratedPaper } from '@/types';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Moderate',
  hard: 'Challenging',
};

interface PaperViewProps {
  paper: GeneratedPaper;
}

export default function PaperView({ paper }: PaperViewProps) {
  return (
    <div className="bg-white rounded-[32px] p-6 lg:p-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* School Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-[#303030]">
        <h1 className="text-2xl lg:text-[32px] font-bold text-[#303030] leading-[160%] tracking-[-0.04em]">{paper.schoolName}</h1>
        <p className="text-lg font-semibold text-[#303030] tracking-[-0.04em]"><strong>Subject:</strong> {paper.subject}</p>
        <p className="text-lg font-semibold text-[#303030] tracking-[-0.04em]"><strong>Class:</strong> {paper.class}</p>
      </div>

      {/* Meta */}
      <div className="flex justify-between text-lg font-semibold text-[#303030] mb-4 tracking-[-0.04em]">
        <span><strong>Time Allowed:</strong> {paper.time}</span>
        <span><strong>Maximum Marks:</strong> {paper.maxMarks}</span>
      </div>

      {/* Instructions */}
      {paper.instructions && paper.instructions.length > 0 && (
        <div className="mb-4 text-lg font-semibold text-[#303030] tracking-[-0.04em]">
          {paper.instructions.map((inst, i) => (
            <p key={i}>{inst}</p>
          ))}
        </div>
      )}

      {/* Student Info Section */}
      <div className="mb-6 text-lg font-semibold text-[#303030] tracking-[-0.04em] space-y-0">
        <p>Name: ______________________</p>
        <p>Roll Number: ________________</p>
        <p>Class: {paper.class} Section: __________</p>
      </div>

      {/* Sections */}
      {paper.sections.map((section, si) => (
        <div key={si} className="mb-8">
          <h3 className="text-2xl font-semibold text-[#303030] text-center mb-2 tracking-[-0.04em]">
            {section.title}
          </h3>
          <p className="text-lg font-semibold text-[#303030] mb-4 tracking-[-0.04em]">{section.instruction}</p>

          <div className="text-base font-normal text-[#303030] leading-[240%] tracking-[-0.04em]">
            {section.questions.map((q) => {
              const diffLabel = q.difficulty ? DIFFICULTY_LABELS[q.difficulty] : null;
              return (
                <div key={q.number}>
                  <p>
                    {diffLabel && <span>[{diffLabel}]</span>}{' '}
                    {q.text} [{q.marks} Marks]
                  </p>
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-4 ml-6 leading-[200%]">
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

      {/* End Divider */}
      <div className="text-center text-lg font-semibold text-[#303030] my-6 pt-4 border-t border-[#303030] tracking-[-0.04em]">
        End of Question Paper
      </div>

      {/* Answer Key */}
      {paper.answerKey && paper.answerKey.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-[#303030]">
          <h3 className="text-2xl font-bold text-[#303030] text-center mb-4 tracking-[-0.04em]">Answer Key</h3>
          <div className="text-base font-normal text-[#303030] leading-[240%] tracking-[-0.04em]">
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
