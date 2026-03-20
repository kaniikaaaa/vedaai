'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Mic } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateStore } from '@/stores/createStore';
import FileUpload from '@/components/create/FileUpload';
import QuestionTypesTable from '@/components/create/QuestionTypesTable';
import * as api from '@/lib/api';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const {
    file,
    dueDate,
    questionTypes,
    additionalInstructions,
    isSubmitting,
    setFile,
    setDueDate,
    updateQuestionType,
    addQuestionType,
    removeQuestionType,
    setAdditionalInstructions,
    setIsSubmitting,
    getTotalQuestions,
    getTotalMarks,
    reset,
  } = useCreateStore();

  const handleSubmit = async () => {
    if (!dueDate) {
      toast.error('Please select a due date');
      return;
    }

    if (questionTypes.length === 0) {
      toast.error('Please add at least one question type');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('dueDate', new Date(dueDate).toISOString());
      formData.append('questionTypes', JSON.stringify(questionTypes));
      formData.append('additionalInstructions', additionalInstructions);

      const assignment = await api.createAssignment(formData);
      toast.success('Assignment created! Generating paper...');
      reset();
      router.push(`/assignment/${assignment._id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <h1 className="text-xl font-bold text-gray-900">Create Assignment</h1>
        </div>
        <p className="text-sm text-gray-500 ml-5">Set up a new assignment for your students.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-1.5 bg-gray-200 rounded-full">
          <div className="h-1.5 bg-gray-900 rounded-full w-full transition-all" />
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Assignment Details</h2>
        <p className="text-sm text-gray-500 mb-6">Basic information about your assignment.</p>

        {/* File Upload */}
        <div className="mb-6">
          <FileUpload file={file} onFileChange={setFile} />
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-900 block mb-2">Due Date</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              placeholder="Choose a date/time"
            />
            <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Question Types */}
        <div className="mb-6">
          <QuestionTypesTable
            questionTypes={questionTypes}
            onUpdate={updateQuestionType}
            onAdd={addQuestionType}
            onRemove={removeQuestionType}
            totalQuestions={getTotalQuestions()}
            totalMarks={getTotalMarks()}
          />
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-900 block mb-2">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="e.g. Generate a question paper for 3 hour exam duration..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
            <Mic className="absolute right-3 bottom-3 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
