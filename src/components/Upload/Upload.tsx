'use client';

import { useState } from 'react';

export interface UploadProps {
  description: string;
  errorMessage: string;
  label: string;
  maxFileSize: number;
  onFileUpload: () => void;
  setError: (error: string | undefined) => void;
}

const Upload: React.FC<UploadProps> = ({
  description,
  errorMessage,
  label,
  maxFileSize,
  onFileUpload,
  setError,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > maxFileSize) {
        const error = errorMessage;
        setLocalError(error);
        setError(error);
        return;
      }

      setLocalError(null);
      setError(undefined);
      onFileUpload();
    }
  };

  return (
    <div className='fr-upload-group border-blue rounded-lg p-4'>
      <label className='fr-label' htmlFor='file-upload'>
        {label}
        <span className='fr-hint-text'>{description}</span>
      </label>
      <input
        className='fr-upload'
        id='file-upload'
        name='file-upload'
        onChange={handleFileChange}
        type='file'
      />
      {localError && (
        <p id='file-upload-with-error-desc-error' className='fr-error-text'>
          {localError}
        </p>
      )}
    </div>
  );
};

export default Upload;
