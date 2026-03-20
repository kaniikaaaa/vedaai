import { createServer } from 'http';
import mongoose from 'mongoose';
import { config } from './config/index.js';
import app from './app.js';
import { initSocket } from './socket/index.js';
import { startPaperWorker } from './jobs/generatePaper.job.js';

const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

// Start worker
startPaperWorker();

// Connect to MongoDB and start server
async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    httpServer.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
