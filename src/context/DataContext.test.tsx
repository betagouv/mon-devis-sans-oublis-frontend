import { render, screen, fireEvent } from '@testing-library/react';

import { DataProvider, Profile, Status, useDataContext } from './DataContext';

// Helper component to consume the context for testing
const TestComponent = () => {
  const { data, setData } = useDataContext();

  return (
    <div>
      <p>{data ? data.status : 'No Data'}</p>
      <button
        onClick={() =>
          setData({
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
    </div>
  );
};

describe('DataContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial null data', () => {
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
    expect(localStorage.getItem('quoteCheckData')).toContain(
      '"status":"valid"'
    );
  });

  it('retrieves data from localStorage on load', () => {
    localStorage.setItem(
      'quoteCheckData',
      JSON.stringify({
        id: '2',
        status: 'pending',
        profile: 'mandataire',
        valid: false,
        errors: [],
        error_details: [],
        error_messages: {},
      })
    );

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByText('pending')).toBeInTheDocument();
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
      'Failed to parse localStorage data:',
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
