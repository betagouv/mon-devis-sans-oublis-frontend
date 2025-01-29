'use client';

import { useState, useRef } from 'react';

import wording from '@/wording';

export interface UploadProps {
  maxFileSize: number;
  onFileUpload: (file: File) => void;
  setError: (error: string | null) => void;
}

const Upload: React.FC<UploadProps> = ({
  maxFileSize,
  onFileUpload,
  setError,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      validateFile(files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      validateFile(event.dataTransfer.files[0]);
    }
  };

  const validateFile = (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024) {
      const error = wording.components.upload.error_file_size.replace(
        '{maxFileSize}',
        maxFileSize.toString()
      );
      setLocalError(error);
      setError(error);
      return;
    }

    if (file.type !== 'application/pdf') {
      const error = wording.components.upload.error_file_type;
      setLocalError(error);
      setError(error);
      return;
    }

    setLocalError(null);
    setError(null);
    setUploadedFile(file);
    onFileUpload(file);
  };

  return (
    <div
      className={`fr-upload-group border-blue rounded-lg p-4 cursor-pointer transition ${
        isDragging ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
      }`}
      data-testid='upload-area'
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label className='fr-label cursor-pointer' htmlFor='file-upload'>
        {wording.components.upload.label}
        <span className='fr-hint-text'>
          {wording.components.upload.description.replace(
            '{maxFileSize}',
            maxFileSize.toString()
          )}
        </span>
      </label>
      <span className='flex flex-row gap-2 items-center mt-4'>
        <p
          className='mb-0 rounded-lg p-2 text-sm'
          style={{
            backgroundColor: isHovered
              ? 'var(--background-contrast-grey-hover)'
              : 'var(--background-contrast-grey)',
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--background-contrast-grey-active)')
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--background-contrast-grey-hover)')
          }
        >
          {wording.components.upload.select_file}
        </p>
        <p className='text-sm mb-0'>
          {uploadedFile ? uploadedFile.name : 'Aucun fichier sélectionné'}
        </p>
      </span>
      <input
        accept='application/pdf'
        data-testid='file-upload'
        id='file-upload'
        name='file-upload'
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: 'none' }}
        type='file'
      />
      {localError && (
        <p
          className='fr-error-text'
          data-testid='upload-error-message'
          id='file-upload-with-error-desc-error'
        >
          {localError}
        </p>
      )}
    </div>
  );
};

export default Upload;
