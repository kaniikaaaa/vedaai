import mongoose, { Schema, Document } from 'mongoose';
import type { AssignmentStatus, GeneratedPaper, QuestionTypeConfig } from '../types/index.js';

export interface IAssignment extends Document {
  dueDate: Date;
  questionTypes: QuestionTypeConfig[];
  additionalInstructions: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  status: AssignmentStatus;
  generatedPaper?: GeneratedPaper;
  aiMessage?: string;
  totalQuestions: number;
  totalMarks: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeSchema = new Schema({
  type: { type: String, required: true },
  count: { type: Number, required: true },
  marks: { type: Number, required: true },
}, { _id: false });

const QuestionSchema = new Schema({
  number: Number,
  text: String,
  marks: Number,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  options: [String],
}, { _id: false });

const SectionSchema = new Schema({
  title: String,
  instruction: String,
  questions: [QuestionSchema],
}, { _id: false });

const AnswerKeySchema = new Schema({
  questionNumber: Number,
  answer: String,
}, { _id: false });

const GeneratedPaperSchema = new Schema({
  title: String,
  schoolName: String,
  subject: String,
  class: String,
  time: String,
  maxMarks: Number,
  instructions: [String],
  sections: [SectionSchema],
  answerKey: [AnswerKeySchema],
}, { _id: false });

const AssignmentSchema = new Schema({
  dueDate: { type: Date, required: true },
  questionTypes: { type: [QuestionTypeSchema], required: true },
  additionalInstructions: { type: String, default: '' },
  uploadedFileUrl: String,
  uploadedFileName: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  generatedPaper: GeneratedPaperSchema,
  aiMessage: String,
  totalQuestions: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
}, { timestamps: true });

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
