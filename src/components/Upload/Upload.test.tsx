import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Upload from './Upload';

const mockOnFileUpload = jest.fn();
const mockSetError = jest.fn();

jest.mock('@/wording', () => ({
  components: {
    upload: {
      label: 'Upload your file',
      description: 'Max file size: {maxFileSize}Mo',
      error_file_size: 'File size exceeds {maxFileSize}Mo.',
      error_file_type: 'Only PDF files are allowed.',
    },
  },
}));

describe('Upload Component', () => {
  const maxFileSize = 5; // 5 Mo

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={mockOnFileUpload}
        setError={mockSetError}
      />
    );

    expect(screen.getByLabelText(/upload your file/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Max file size: ${maxFileSize}Mo`)
    ).toBeInTheDocument();
  });

  test('accepts a valid PDF file under the size limit', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={mockOnFileUpload}
        setError={mockSetError}
      />
    );

    const file = new File(
      [new Array(3 * 1024 * 1024).fill('a').join('')],
      'example.pdf',
      {
        type: 'application/pdf',
      }
    );

    const input = screen.getByLabelText(/upload your file/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
    expect(mockSetError).toHaveBeenCalledWith(null);
  });

  test('rejects files that exceed the size limit', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={mockOnFileUpload}
        setError={mockSetError}
      />
    );

    const file = new File(
      [new Array(6 * 1024 * 1024).fill('a').join('')],
      'large.pdf',
      {
        type: 'application/pdf',
      }
    );

    const input = screen.getByLabelText(/upload your file/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith(
      `File size exceeds ${maxFileSize}Mo.`
    );
  });

  test('rejects non-PDF files', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={mockOnFileUpload}
        setError={mockSetError}
      />
    );

    const file = new File(
      [new Array(2 * 1024 * 1024).fill('a').join('')],
      'image.png',
      {
        type: 'image/png',
      }
    );

    const input = screen.getByLabelText(/upload your file/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith('Only PDF files are allowed.');
  });
});
