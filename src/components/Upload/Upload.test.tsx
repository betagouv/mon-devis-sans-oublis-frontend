import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Upload from './Upload';

describe('Upload Component', () => {
  let onFileUploadMock: jest.Mock;
  let setErrorMock: jest.Mock;
  const maxFileSize = 5; // 5MB

  beforeEach(() => {
    onFileUploadMock = jest.fn();
    setErrorMock = jest.fn();
  });

  it('renders correctly with default text', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    expect(screen.getByText('Aucun fichier sélectionné')).toBeInTheDocument();
    expect(screen.getByText(/Choisir le fichier/i)).toBeInTheDocument();
  });

  it('opens the file explorer when clicking on the upload area', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const uploadDiv = screen.getByTestId('upload-area');
    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;

    fireEvent.click(uploadDiv);
    expect(fileInput).toBeDefined();
  });

  it('accepts a valid PDF file and resets errors', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    const validFile = new File(['dummy content'], 'test.pdf', {
      type: 'application/pdf',
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(onFileUploadMock).toHaveBeenCalledWith(validFile);
    expect(setErrorMock).toHaveBeenCalledWith(null);
  });

  it('shows an error when uploading a non-PDF file', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    const invalidFile = new File(['dummy content'], 'test.txt', {
      type: 'text/plain',
    });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(setErrorMock).toHaveBeenCalled();
    expect(onFileUploadMock).not.toHaveBeenCalled();
  });

  it('shows an error when the file is too large', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    const largeFile = new File(['a'.repeat(6 * 1024 * 1024)], 'big.pdf', {
      type: 'application/pdf',
    });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(setErrorMock).toHaveBeenCalled();
    expect(onFileUploadMock).not.toHaveBeenCalled();
  });

  it('handles drag and drop correctly', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const uploadDiv = screen.getByTestId('upload-area');
    const droppedFile = new File(['dummy content'], 'dragged.pdf', {
      type: 'application/pdf',
    });

    fireEvent.dragOver(uploadDiv);
    fireEvent.drop(uploadDiv, { dataTransfer: { files: [droppedFile] } });

    expect(onFileUploadMock).toHaveBeenCalledWith(droppedFile);
    expect(setErrorMock).toHaveBeenCalledWith(null);
  });

  it('resets drag state on drag leave', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const uploadDiv = screen.getByTestId('upload-area');

    fireEvent.dragOver(uploadDiv);
    fireEvent.dragLeave(uploadDiv);
  });

  it('changes button background color on hover', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const uploadDiv = screen.getByTestId('upload-area');
    const button = screen.getByText(/Choisir le fichier/i);

    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey)'
    );

    fireEvent.mouseEnter(uploadDiv);
    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey-hover)'
    );

    fireEvent.mouseLeave(uploadDiv);
    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey)'
    );
  });

  it('changes button background color on mouse down and mouse up', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const button = screen.getByText(/Choisir le fichier/i);

    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey)'
    );

    fireEvent.mouseDown(button);
    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey-active)'
    );

    fireEvent.mouseUp(button);
    expect(button).toHaveStyle(
      'background-color: var(--background-contrast-grey-hover)'
    );
  });

  it('sets isDragging to true on drag enter', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const uploadDiv = screen.getByTestId('upload-area');

    fireEvent.dragEnter(uploadDiv);

    expect(uploadDiv).toHaveClass('bg-blue-100 border-blue-500');
  });

  it('displays an error message when a file is invalid', () => {
    render(
      <Upload
        maxFileSize={maxFileSize}
        onFileUpload={onFileUploadMock}
        setError={setErrorMock}
      />
    );

    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    const invalidFile = new File(['dummy content'], 'test.txt', {
      type: 'text/plain',
    });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.getByTestId('upload-error-message')).toBeInTheDocument();
  });
});
