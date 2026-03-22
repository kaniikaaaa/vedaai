import { Queue, Worker } from 'bullmq';
import { config } from '../config/index.js';

const redisUrl = new URL(config.redisUrl);
const connection = {
  host: redisUrl.hostname || 'localhost',
  port: parseInt(redisUrl.port || '6379', 10),
  password: redisUrl.password || undefined,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined,
  maxRetriesPerRequest: null,
};

export const paperQueue = new Queue('paper-generation', { connection });

export function createWorker(processor: (job: any) => Promise<void>): Worker {
  return new Worker('paper-generation', processor, {
    connection,
    concurrency: 2,
  });
}
