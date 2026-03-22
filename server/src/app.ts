import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config/index.js';
import assignmentRoutes from './routes/assignment.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: config.clientUrl.split(',').map(s => s.trim()),
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/assignments', assignmentRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
