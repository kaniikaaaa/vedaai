'use client';

import { useEffect } from 'react';
import { useAssignmentStore } from '@/stores/assignmentStore';
import EmptyState from '@/components/assignments/EmptyState';
import AssignmentList from '@/components/assignments/AssignmentList';

export default function HomePage() {
  const { assignments, isLoading, searchQuery, setSearchQuery, fetchAssignments, deleteAssignment } =
    useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  if (!isLoading && assignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <AssignmentList
      assignments={assignments}
      isLoading={isLoading}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onDelete={deleteAssignment}
    />
  );
}
