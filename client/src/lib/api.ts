import type { Assignment } from '@/types';
import { API_BASE } from '@/lib/constants';

const API_URL = `${API_BASE}/api`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  return res.json();
}

export async function fetchAssignments(): Promise<Assignment[]> {
  return request('/assignments');
}

export async function fetchAssignment(id: string): Promise<Assignment> {
  return request(`/assignments/${id}`);
}

export async function createAssignment(formData: FormData): Promise<Assignment> {
  return request('/assignments', { method: 'POST', body: formData });
}

export async function deleteAssignment(id: string): Promise<void> {
  await request(`/assignments/${id}`, { method: 'DELETE' });
}

export async function regenerateAssignment(id: string): Promise<Assignment> {
  return request(`/assignments/${id}/regenerate`, { method: 'POST' });
}

export function getPDFUrl(id: string): string {
  return `${API_URL}/assignments/${id}/pdf`;
}
