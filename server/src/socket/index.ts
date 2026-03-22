import { Server as IOServer } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { config } from '../config/index.js';

let io: IOServer;

export function initSocket(httpServer: HTTPServer): IOServer {
  io = new IOServer(httpServer, {
    cors: {
      origin: config.clientUrl.split(',').map(s => s.trim()),
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', (assignmentId: string) => {
      socket.join(`assignment:${assignmentId}`);
      console.log(`Socket ${socket.id} joined room assignment:${assignmentId}`);
    });

    socket.on('leave', (assignmentId: string) => {
      socket.leave(`assignment:${assignmentId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): IOServer {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}
