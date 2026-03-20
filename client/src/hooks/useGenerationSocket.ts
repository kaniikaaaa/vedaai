'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGenerationStore } from '@/stores/generationStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001';

export function useGenerationSocket(assignmentId: string) {
  const socketRef = useRef<Socket | null>(null);
  const { setAll } = useGenerationStore();

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join', assignmentId);
    });

    socket.on('assignment:status', (data) => {
      setAll({ status: data.status });
    });

    socket.on('assignment:completed', (data) => {
      setAll({
        status: 'completed',
        message: data.message,
        paper: data.paper,
      });
    });

    socket.on('assignment:failed', (data) => {
      setAll({
        status: 'failed',
        message: data.error || 'Generation failed',
      });
    });

    return () => {
      socket.emit('leave', assignmentId);
      socket.disconnect();
    };
  }, [assignmentId, setAll]);

  return socketRef;
}
