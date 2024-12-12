import { render, screen, fireEvent } from '@testing-library/react';
import Upload from './Upload';

describe('Upload Component', () => {
  const mockOnFileUpload = jest.fn();
  const mockSetError = jest.fn();

  const defaultProps = {
    description: 'Max file size: 1 MB. Supported formats: jpg, png, pdf.',
    errorMessage: 'The file exceeds the maximum size of 1 MB.',
    label: 'Upload File',
    maxFileSize: 1 * 1024 * 1024, // 1 MB in bytes
    onFileUpload: mockOnFileUpload,
    setError: mockSetError,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders the upload component', () => {
    render(<Upload {...defaultProps} />);

    const labelElement = screen.getByLabelText(/upload file/i);
    expect(labelElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/max file size: 1 mb/i);
    expect(descriptionElement).toBeInTheDocument();

    const inputElement = screen.getByLabelText(/upload file/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onFileUpload when a valid file is uploaded', () => {
    render(<Upload {...defaultProps} />);

    const inputElement = screen.getByLabelText(/upload file/i);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith(null);
  });

  test('displays an error message when the file exceeds the maximum size', () => {
    render(<Upload {...defaultProps} />);

    const inputElement = screen.getByLabelText(/upload file/i);
    const largeContent = 'x'.repeat(2 * 1024 * 1024); // Create 2MB of content
    const largeFile = new File([largeContent], 'large-file.png', {
      type: 'image/png',
    }); // 2 MB

    fireEvent.change(inputElement, { target: { files: [largeFile] } });

    const errorMessage = screen.getByText(
      /the file exceeds the maximum size of 1 mb/i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(mockSetError).toHaveBeenCalledWith(
      'The file exceeds the maximum size of 1 MB.'
    );
    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });

  test('clears error message when a valid file is uploaded after an error', () => {
    render(<Upload {...defaultProps} />);

    const inputElement = screen.getByLabelText(/upload file/i);
    // Create a large file (2 MB) by using a longer dummy content
    const largeContent = 'x'.repeat(2 * 1024 * 1024);
    const largeFile = new File([largeContent], 'large-file.png', {
      type: 'image/png',
    });

    // First, upload a large file to trigger an error
    fireEvent.change(inputElement, { target: { files: [largeFile] } });

    // Now upload a valid file
    const validFile = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    fireEvent.change(inputElement, { target: { files: [validFile] } });

    // Check that the error message is cleared
    expect(
      screen.queryByText(/the file exceeds the maximum size of 1 mb/i)
    ).not.toBeInTheDocument();
    expect(mockSetError).toHaveBeenCalledWith(null);
    expect(mockOnFileUpload).toHaveBeenCalled();
  });
});
