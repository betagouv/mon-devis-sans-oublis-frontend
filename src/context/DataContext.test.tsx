import { render, screen, act } from '@testing-library/react';
import {
  DataProvider,
  useDataContext,
  Status,
  Profile,
  Category,
  Type,
} from './DataContext';

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
            error_details: [
              {
                id: '1',
                category: Category.ADMIN,
                type: Type.MISSING,
                code: 'TEST_CODE',
                title: 'Test Title',
                problem: 'Test Problem',
                solution: 'Test Solution',
                provided_value: null,
              },
            ],
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
    localStorage.clear();
  });

  test('loads data from localStorage on mount', () => {
    const mockData = [
      {
        id: '1',
        status: Status.PENDING,
        profile: Profile.ARTISAN,
        valid: true,
        errors: [],
        error_details: [
          {
            id: '1',
            category: Category.ADMIN,
            type: Type.MISSING,
            code: 'TEST_CODE',
            title: 'Test Title',
            problem: 'Test Problem',
            solution: 'Test Solution',
            provided_value: null,
          },
        ],
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

    const expectedData = {
      id: '1',
      status: Status.VALID,
      profile: Profile.ARTISAN,
      valid: true,
      errors: [],
      error_details: [
        {
          id: '1',
          category: Category.ADMIN,
          type: Type.MISSING,
          code: 'TEST_CODE',
          title: 'Test Title',
          problem: 'Test Problem',
          solution: 'Test Solution',
          provided_value: null,
        },
      ],
      error_messages: {},
    };

    expect(screen.getByTestId('data-display')).toHaveTextContent(
      JSON.stringify([expectedData])
    );
    expect(JSON.parse(localStorage.getItem('quoteCheckData') || '[]')).toEqual([
      expectedData,
    ]);
  });

  test('clears pending devis and updates localStorage', () => {
    const mockData = [
      {
        id: '1',
        status: Status.PENDING,
        profile: Profile.ARTISAN,
        valid: true,
        errors: [],
        error_details: [
          {
            id: '1',
            category: Category.ADMIN,
            type: Type.MISSING,
            code: 'TEST_CODE',
            title: 'Test Title',
            problem: 'Test Problem',
            solution: 'Test Solution',
            provided_value: null,
          },
        ],
        error_messages: {},
      },
      {
        id: '2',
        status: Status.VALID,
        profile: Profile.CONSEILLER,
        valid: true,
        errors: [],
        error_details: [
          {
            id: '2',
            category: Category.GESTES,
            type: Type.WRONG,
            code: 'TEST_CODE_2',
            title: 'Test Title 2',
            problem: 'Test Problem 2',
            solution: 'Test Solution 2',
            provided_value: 'test value',
          },
        ],
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

    const expectedData = [mockData[1]]; // Only the VALID status devis should remain

    expect(screen.getByTestId('data-display')).toHaveTextContent(
      JSON.stringify(expectedData)
    );
    expect(JSON.parse(localStorage.getItem('quoteCheckData') || '[]')).toEqual(
      expectedData
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
