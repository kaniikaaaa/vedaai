'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Mic } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateStore } from '@/stores/createStore';
import FileUpload from '@/components/create/FileUpload';
import QuestionTypesTable from '@/components/create/QuestionTypesTable';
import PageHeader from '@/components/ui/PageHeader';
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
      <PageHeader title="Create Assignment" subtitle="Set up a new assignment for your students." />

      {/* Progress Bar */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex-1 h-[5px] bg-[#5E5E5E] rounded-full" />
        <div className="flex-1 h-[5px] bg-[#DADADA] rounded-full" />
      </div>

      {/* Form Card */}
      <div className="bg-white/50 rounded-[32px] p-6 lg:p-8">
        <h2 className="text-xl font-bold text-[#303030] mb-0.5 tracking-[-0.04em]">Assignment Details</h2>
        <p className="text-sm text-[#5E5E5ECC] mb-8 tracking-[-0.04em]">Basic information about your assignment.</p>

        {/* File Upload */}
        <div className="mb-4">
          <FileUpload file={file} onFileChange={setFile} />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="text-base font-bold text-[#303030] block mb-2 tracking-[-0.04em]">Due Date</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 text-base font-medium text-[#303030] placeholder:text-[#A9A9A9] border-[1.25px] border-[#DADADA] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5623] appearance-none tracking-[-0.04em]"
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2B2B2B] pointer-events-none" />
          </div>
        </div>

        {/* Question Types */}
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="text-base font-bold text-[#303030] block mb-2 tracking-[-0.04em]">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="e.g. Generate a question paper for 3 hour exam duration..."
              rows={3}
              className="w-full px-4 py-4 text-sm font-medium text-[#303030] placeholder:text-[#30303099] bg-white/25 border-[1.25px] border-dashed border-[#DADADA] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5623] resize-none tracking-[-0.04em]"
            />
            <div className="absolute right-3 bottom-3 w-9 h-9 bg-[#F0F0F0] rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#303030]" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 px-6 py-3 text-base font-medium text-[#303030] bg-white rounded-[48px] hover:bg-[#F0F0F0] transition-colors tracking-[-0.04em]"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-1 px-6 py-3 text-base font-medium text-white bg-[#181818] rounded-[48px] hover:bg-[#272727] transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-[-0.04em]"
        >
          {isSubmitting ? 'Creating...' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
