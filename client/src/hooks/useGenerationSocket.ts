'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGenerationStore } from '@/stores/generationStore';
import { API_BASE } from '@/lib/constants';

export function useGenerationSocket(assignmentId: string) {
  const { setAll } = useGenerationStore();

  useEffect(() => {
    const socket = io(API_BASE, { transports: ['websocket', 'polling'] });

    socket.on('connect', () => { socket.emit('join', assignmentId); });
    socket.on('assignment:status', (data) => { setAll({ status: data.status }); });
    socket.on('assignment:completed', (data) => { setAll({ status: 'completed', message: data.message, paper: data.paper }); });
    socket.on('assignment:failed', (data) => { setAll({ status: 'failed', message: data.error || 'Generation failed' }); });

    return () => {
      socket.emit('leave', assignmentId);
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [assignmentId, setAll]);
}
