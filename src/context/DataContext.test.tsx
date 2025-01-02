import { act, ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import {
  DataProvider,
  useDataContext,
  QuoteChecksId,
  Status,
  Profile,
  Category,
  Type,
} from './DataContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockQuote: QuoteChecksId = {
  id: '123',
  status: Status.PENDING,
  profile: Profile.ARTISAN,
  valid: false,
  errors: ['error1'],
  error_details: [
    {
      id: 'error1',
      category: Category.FILE,
      type: Type.MISSING,
      code: 'ERR_001',
      title: 'Error Title',
      problem: 'Problem description',
      solution: 'Solution description',
      provided_value: null,
    },
  ],
  error_messages: { key: 'message' },
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <DataProvider>{children}</DataProvider>
);

describe('DataContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should initialize with empty data', () => {
    const { result } = renderHook(() => useDataContext(), { wrapper });
    expect(result.current.data).toEqual([]);
  });

  it('should load data from localStorage on mount', () => {
    const storedData = [mockQuote];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedData));

    const { result } = renderHook(() => useDataContext(), { wrapper });
    expect(result.current.data).toEqual(storedData);
  });

  it('should handle localStorage parsing error', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    localStorageMock.getItem.mockReturnValueOnce('invalid JSON');

    const { result } = renderHook(() => useDataContext(), { wrapper });
    expect(result.current.data).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should update devis correctly', async () => {
    const { result } = renderHook(() => useDataContext(), { wrapper });

    await act(async () => {
      result.current.updateDevis(mockQuote);
    });

    expect(result.current.data).toEqual([mockQuote]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'quoteCheckData',
      JSON.stringify([mockQuote])
    );
  });

  it('should update existing devis', async () => {
    const storedData = [mockQuote];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedData));

    const { result } = renderHook(() => useDataContext(), { wrapper });

    const updatedQuote = { ...mockQuote, status: Status.VALID };
    await act(async () => {
      result.current.updateDevis(updatedQuote);
    });

    expect(result.current.data).toEqual([updatedQuote]);
  });

  it('should clear pending devis', async () => {
    const initialData = [
      mockQuote,
      { ...mockQuote, id: '456', status: Status.VALID },
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(initialData));

    const { result } = renderHook(() => useDataContext(), { wrapper });

    await act(async () => {
      result.current.clearPendingDevis();
    });

    const expectedData = initialData.filter((d) => d.status !== Status.PENDING);
    expect(result.current.data).toEqual(expectedData);
  });

  it('should throw error when used outside provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useDataContext());
    }).toThrow('useDataContext must be used within a DataProvider');

    consoleError.mockRestore();
  });

  // Remove the server-side rendering test since we're using jsdom environment
});
