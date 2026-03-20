import type { Job } from 'bullmq';
import { Assignment } from '../models/assignment.model.js';
import { generatePaper } from '../services/ai.service.js';
import { getIO } from '../socket/index.js';
import { createWorker } from './queue.js';

export function startPaperWorker() {
  const worker = createWorker(async (job: Job) => {
    const { assignmentId } = job.data;
    const io = getIO();

    try {
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        throw new Error(`Assignment ${assignmentId} not found`);
      }

      // Update status to processing
      assignment.status = 'processing';
      await assignment.save();
      io.to(`assignment:${assignmentId}`).emit('assignment:status', { status: 'processing' });

      // Generate paper
      const result = await generatePaper(
        assignment.questionTypes,
        assignment.additionalInstructions,
        assignment.uploadedFileUrl
      );

      // Save results
      assignment.generatedPaper = result.paper;
      assignment.aiMessage = result.message;
      assignment.status = 'completed';
      await assignment.save();

      io.to(`assignment:${assignmentId}`).emit('assignment:completed', {
        status: 'completed',
        message: result.message,
        paper: result.paper,
      });

      console.log(`Paper generated for assignment ${assignmentId}`);
    } catch (error) {
      console.error(`Failed to generate paper for ${assignmentId}:`, error);

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: 'failed',
        aiMessage: error instanceof Error ? error.message : 'Generation failed',
      });

      io.to(`assignment:${assignmentId}`).emit('assignment:failed', {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Generation failed',
      });
    }
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  console.log('Paper generation worker started');
  return worker;
}
