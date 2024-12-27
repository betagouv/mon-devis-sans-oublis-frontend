import { render, screen, act } from '@testing-library/react';

import { DataProvider, useDataContext, Status, Profile } from './DataContext';

const TestComponent = () => {
  const { data, updateDevis, clearPendingDevis } = useDataContext();

  return (
    <div>
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
        Update Devis
      </button>
      <button onClick={clearPendingDevis}>Clear Pending Devis</button>
      <div data-testid='data-display'>{JSON.stringify(data)}</div>
    </div>
  );
};

describe('DataContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('loads data from localStorage on mount', () => {
    const mockData = [
      {
        id: '1',
        status: Status.PENDING,
        profile: 'artisan',
        valid: true,
        errors: [],
        error_details: [],
        error_messages: {},
      },
    ];
    localStorage.setItem('quoteCheckData', JSON.stringify(mockData));

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByTestId('data-display')).toHaveTextContent(
      JSON.stringify(mockData)
    );
  });

  test('updates devis and saves to localStorage', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    act(() => {
      screen.getByText('Update Devis').click();
    });

    expect(screen.getByTestId('data-display')).toHaveTextContent(
      '{"id":"1","status":"valid","profile":"artisan","valid":true,"errors":[],"error_details":[],"error_messages":{}}'
    );
    expect(localStorage.getItem('quoteCheckData')).toContain(
      '{"id":"1","status":"valid","profile":"artisan","valid":true,"errors":[],"error_details":[],"error_messages":{}}'
    );
  });

  test('clears pending devis and updates localStorage', () => {
    const mockData = [
      {
        id: '1',
        status: Status.PENDING,
        profile: 'artisan',
        valid: true,
        errors: [],
        error_details: [],
        error_messages: {},
      },
      {
        id: '2',
        status: Status.VALID,
        profile: 'conseiller',
        valid: true,
        errors: [],
        error_details: [],
        error_messages: {},
      },
    ];
    localStorage.setItem('quoteCheckData', JSON.stringify(mockData));

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    act(() => {
      screen.getByText('Clear Pending Devis').click();
    });

    expect(screen.getByTestId('data-display')).toHaveTextContent(
      JSON.stringify([
        {
          id: '2',
          status: Status.VALID,
          profile: 'conseiller',
          valid: true,
          errors: [],
          error_details: [],
          error_messages: {},
        },
      ])
    );
    expect(localStorage.getItem('quoteCheckData')).toContain(
      '{"id":"2","status":"valid","profile":"conseiller","valid":true,"errors":[],"error_details":[],"error_messages":{}}'
    );
  });

  test('throws error when useDataContext is used outside of DataProvider', () => {
    const TestComponentWithoutProvider = () => {
      useDataContext();
      return null;
    };

    expect(() => render(<TestComponentWithoutProvider />)).toThrow(
      'useDataContext must be used within a DataProvider'
    );
  });
});
