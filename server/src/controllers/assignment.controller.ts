import type { Request, Response } from 'express';
import { Assignment } from '../models/assignment.model.js';
import { paperQueue } from '../jobs/queue.js';
import { generatePDF } from '../services/pdf.service.js';

export async function createAssignment(req: Request, res: Response) {
  try {
    const { dueDate, questionTypes, additionalInstructions } = req.body;

    const parsedQuestionTypes = typeof questionTypes === 'string'
      ? JSON.parse(questionTypes)
      : questionTypes;

    const totalQuestions = parsedQuestionTypes.reduce((sum: number, qt: any) => sum + qt.count, 0);
    const totalMarks = parsedQuestionTypes.reduce((sum: number, qt: any) => sum + qt.count * qt.marks, 0);

    const assignment = await Assignment.create({
      dueDate,
      questionTypes: parsedQuestionTypes,
      additionalInstructions: additionalInstructions || '',
      uploadedFileUrl: req.file ? `uploads/${req.file.filename}` : undefined,
      uploadedFileName: req.file ? req.file.originalname : undefined,
      totalQuestions,
      totalMarks,
      status: 'pending',
    });

    // Enqueue generation job
    await paperQueue.add('generate', { assignmentId: assignment._id.toString() });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create assignment' });
  }
}

export async function getAssignments(_req: Request, res: Response) {
  try {
    const assignments = await Assignment.find()
      .select('-generatedPaper')
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
}

export async function getAssignment(req: Request, res: Response) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
}

export async function deleteAssignment(req: Request, res: Response) {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
}

export async function downloadPDF(req: Request, res: Response) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    if (!assignment.generatedPaper) {
      return res.status(400).json({ error: 'Paper not yet generated' });
    }

    const pdfBuffer = await generatePDF(assignment.generatedPaper);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="question-paper-${assignment._id}.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

export async function regenerateAssignment(req: Request, res: Response) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = 'pending';
    assignment.generatedPaper = undefined;
    assignment.aiMessage = undefined;
    await assignment.save();

    await paperQueue.add('generate', { assignmentId: assignment._id.toString() });

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to regenerate' });
  }
}
