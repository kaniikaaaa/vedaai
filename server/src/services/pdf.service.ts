import puppeteer from 'puppeteer';
import type { GeneratedPaper } from '../types/index.js';

function getDifficultyBadge(difficulty?: string): string {
  if (!difficulty) return '';
  const styles: Record<string, string> = {
    easy: 'background:#dcfce7;color:#15803d;',
    medium: 'background:#fef9c3;color:#a16207;',
    hard: 'background:#fee2e2;color:#b91c1c;',
  };
  const labels: Record<string, string> = { easy: 'Easy', medium: 'Moderate', hard: 'Hard' };
  const style = styles[difficulty] || '';
  const label = labels[difficulty] || difficulty;
  return `<span class="difficulty" style="${style}">${label}</span>`;
}

function buildPaperHTML(paper: GeneratedPaper): string {
  const sectionsHTML = paper.sections
    .map(section => {
      const questionsHTML = section.questions
        .map(q => {
          let questionContent = `<div class="question">
            <p><strong>${q.number}.</strong> ${q.text} <span class="marks">[${q.marks} Marks]</span> ${getDifficultyBadge(q.difficulty)}</p>`;
          if (q.options && q.options.length > 0) {
            questionContent += `<div class="options">${q.options
              .map((opt, i) => `<span class="option">(${String.fromCharCode(97 + i)}) ${opt}</span>`)
              .join('')}</div>`;
          }
          questionContent += '</div>';
          return questionContent;
        })
        .join('');

      return `<div class="section">
        <h3>${section.title}</h3>
        <p class="section-instruction"><em>${section.instruction}</em></p>
        ${questionsHTML}
      </div>`;
    })
    .join('');

  const instructionsHTML = (paper.instructions && paper.instructions.length > 0)
    ? `<div class="instructions">
        <p class="instructions-heading">Instructions:</p>
        ${paper.instructions.map(inst => `<p>• ${inst}</p>`).join('')}
      </div>`
    : '';

  const answerKeyHTML = (paper.answerKey && paper.answerKey.length > 0)
    ? `<div class="answer-key">
        <h3>Answer Key</h3>
        ${paper.answerKey.map(a => `<p><strong>${a.questionNumber}.</strong> ${a.answer}</p>`).join('')}
      </div>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Times New Roman', serif; padding: 40px; color: #1a1a1a; line-height: 1.6; }
  .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; }
  .header h1 { font-size: 22px; margin-bottom: 5px; }
  .header p { font-size: 14px; margin: 2px 0; }
  .meta { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; }
  .instructions { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 3px solid #333; font-size: 13px; }
  .instructions-heading { font-weight: 600; margin-bottom: 4px; font-style: normal !important; }
  .instructions p { margin: 3px 0; font-style: italic; }
  .student-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 15px 0; font-size: 14px; color: #555; }
  .section { margin: 25px 0; }
  .section h3 { font-size: 16px; margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
  .section-instruction { font-size: 13px; margin-bottom: 12px; color: #555; }
  .question { margin: 12px 0; font-size: 14px; }
  .marks { color: #666; font-size: 12px; }
  .difficulty { font-size: 11px; padding: 1px 6px; border-radius: 9999px; margin-left: 6px; }
  .options { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; margin: 6px 0 6px 20px; font-size: 13px; }
  .option { padding: 2px 0; }
  .divider { text-align: center; margin: 30px 0; font-weight: bold; border-top: 1px solid #999; padding-top: 10px; font-size: 13px; }
  .answer-key { margin-top: 30px; page-break-before: always; }
  .answer-key h3 { font-size: 18px; margin-bottom: 15px; text-align: center; }
  .answer-key p { font-size: 13px; margin: 5px 0; }
</style>
</head>
<body>
  <div class="header">
    <h1>${paper.schoolName}</h1>
    <p><strong>Subject:</strong> ${paper.subject}</p>
    <p><strong>Class:</strong> ${paper.class}</p>
  </div>
  <div class="meta">
    <span><strong>Time Allowed:</strong> ${paper.time}</span>
    <span><strong>Maximum Marks:</strong> ${paper.maxMarks}</span>
  </div>
  ${instructionsHTML}
  <div class="student-info">
    <span>Name: _________________________</span>
    <span>Roll Number: _______________</span>
    <span>Section: _______</span>
    <span>Date: ___/___/______</span>
  </div>
  ${sectionsHTML}
  <div class="divider">--- End of Question Paper ---</div>
  ${answerKeyHTML}
</body>
</html>`;
}

export async function generatePDF(paper: GeneratedPaper): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(buildPaperHTML(paper), { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
      printBackground: true,
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
