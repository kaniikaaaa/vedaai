'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function FileUpload({ file, onFileChange }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0]);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  if (file) {
    return (
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
        <button
          onClick={() => onFileChange(null)}
          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
      <p className="text-sm text-gray-600 mb-1">
        Choose a file or drag & drop it here
      </p>
      <p className="text-xs text-gray-400 mb-3">PDF, PNG, JPG, DOCX</p>
      <button
        type="button"
        className="text-sm text-gray-600 border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Browse Files
      </button>
      <p className="text-xs text-gray-400 mt-3">
        Upload images of your preferred document/image
      </p>
    </div>
  );
}
