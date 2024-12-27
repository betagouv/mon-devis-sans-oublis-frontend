import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import {
  DataProvider,
  Profile,
  Status,
  useDataContext,
  QuoteChecksId,
} from './DataContext';

// Mock localStorage for tests
beforeEach(() => {
  localStorage.clear();
});

const TestComponent = () => {
  const { data, updateDevis, clearPendingDevis } = useDataContext();

  return (
    <div>
      <p>{data.length > 0 ? data[0].status : 'No Data'}</p>

      <button
        onClick={() =>
          updateDevis({
            id: '1',
            status: Status.VALID,
            profile: Profile.ARTISAN,
            valid: true,
            errors: [],
            error_details: [],
            error_messages: {},
          })
        }
      >
        Update Data
      </button>

      <button
        onClick={() =>
          updateDevis({
            id: '1',
            status: Status.INVALID,
            profile: Profile.CONSEILLER,
            valid: false,
            errors: ['Error'],
            error_details: [],
            error_messages: {},
          })
        }
      >
        Overwrite Data
      </button>

      <button
        onClick={() =>
          updateDevis({
            id: '2',
            status: Status.PENDING,
            profile: Profile.MANDATAIRE,
            valid: false,
            errors: [],
            error_details: [],
            error_messages: {},
          })
        }
      >
        Add Pending
      </button>

      <button onClick={clearPendingDevis}>Clear Pending</button>
    </div>
  );
};

describe('DataProvider and useDataContext', () => {
  it('provides initial empty data', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(screen.getByText('No Data')).toBeInTheDocument();
  });

  it('updates data and persists in localStorage', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByText('Update Data'));
    expect(screen.getByText('valid')).toBeInTheDocument();

    const storedData = localStorage.getItem('quoteCheckData');
    expect(storedData).toContain('"status":"valid"');
  });

  it('overwrites data with the same ID', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByText('Update Data'));
    fireEvent.click(screen.getByText('Overwrite Data'));

    expect(screen.getByText('invalid')).toBeInTheDocument();

    const storedData = JSON.parse(
      localStorage.getItem('quoteCheckData') as string
    );
    expect(storedData[0].status).toBe('invalid');
    expect(storedData[0].errors).toContain('Error');
  });

  it('adds multiple quotes and clears pending', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByText('Update Data'));
    fireEvent.click(screen.getByText('Add Pending'));

    const storedData = JSON.parse(
      localStorage.getItem('quoteCheckData') as string
    );
    expect(storedData).toHaveLength(2);

    fireEvent.click(screen.getByText('Clear Pending'));
    const filteredData = JSON.parse(
      localStorage.getItem('quoteCheckData') as string
    );
    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].status).toBe('valid');
  });

  it('clears pending without affecting non-pending quotes', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByText('Update Data'));
    fireEvent.click(screen.getByText('Clear Pending'));

    const storedData = JSON.parse(
      localStorage.getItem('quoteCheckData') as string
    );
    expect(storedData).toHaveLength(1);
    expect(storedData[0].status).toBe('valid');
  });

  it('retrieves data from localStorage on load', () => {
    const mockQuote: QuoteChecksId = {
      id: '3',
      status: Status.PENDING,
      profile: Profile.PARTICULIER,
      valid: false,
      errors: [],
      error_details: [],
      error_messages: {},
    };
    localStorage.setItem('quoteCheckData', JSON.stringify([mockQuote]));

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('handles empty localStorage without errors', () => {
    localStorage.removeItem('quoteCheckData');

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByText('No Data')).toBeInTheDocument();
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('quoteCheckData', '{invalid json}');

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error reading from localStorage:',
      expect.any(SyntaxError)
    );

    consoleErrorSpy.mockRestore();
  });

  it('throws an error if used outside DataProvider', () => {
    const ErrorThrowingComponent = () => {
      try {
        useDataContext();
      } catch (error: unknown) {
        if (error instanceof Error) {
          return <p>{error.message}</p>;
        }
        return <p>An unknown error occurred</p>;
      }
      return null;
    };

    render(<ErrorThrowingComponent />);
    expect(
      screen.getByText('useDataContext must be used within a DataProvider')
    ).toBeInTheDocument();
  });
});
