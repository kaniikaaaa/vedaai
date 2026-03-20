import { Queue, Worker } from 'bullmq';
import { config } from '../config/index.js';

const connection = {
  host: new URL(config.redisUrl).hostname || 'localhost',
  port: parseInt(new URL(config.redisUrl).port || '6379', 10),
  maxRetriesPerRequest: null,
};

export const paperQueue = new Queue('paper-generation', { connection });

export function createWorker(processor: (job: any) => Promise<void>): Worker {
  return new Worker('paper-generation', processor, {
    connection,
    concurrency: 2,
  });
}
