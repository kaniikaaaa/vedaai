'use client';

import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function FileUpload({ file, onFileChange }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => { if (acceptedFiles.length > 0) onFileChange(acceptedFiles[0]); },
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  if (file) {
    return (
      <div className="border-[1.75px] border-dashed border-black/20 rounded-3xl p-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#FF5623]" />
          <div>
            <p className="text-base font-medium text-[#303030] tracking-[-0.04em]">{file.name}</p>
            <p className="text-sm text-[#A9A9A9] tracking-[-0.04em]">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
        <button onClick={() => onFileChange(null)} className="p-1.5 hover:bg-[#F0F0F0] rounded-lg transition-colors">
          <X className="w-4 h-4 text-[#303030]" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-[1.75px] border-dashed rounded-3xl p-6 text-center cursor-pointer transition-colors bg-white ${
          isDragActive ? 'border-[#FF5623] bg-orange-50' : 'border-black/20 hover:border-black/30'
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <Upload className="w-6 h-6 text-[#1E1E1E]" />
        </div>
        <p className="text-base font-medium text-[#303030] mb-1 tracking-[-0.04em]">
          Choose a file or drag & drop it here
        </p>
        <p className="text-sm text-[#A9A9A9] mb-4 tracking-[-0.04em]">PDF, TXT, upto 10MB</p>
        <button
          type="button"
          className="text-sm font-medium text-[#303030] bg-[#F6F6F6] px-6 py-2 rounded-[48px] hover:bg-[#EEEEEE] transition-colors tracking-[-0.04em]"
        >
          Browse Files
        </button>
      </div>
      <p className="text-base font-medium text-[#303030]/60 tracking-[-0.04em]">
        Upload images of your preferred document/image
      </p>
    </div>
  );
}
