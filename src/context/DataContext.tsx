'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

export enum Category {
  ADMIN = 'admin',
  GESTES = 'gestes',
}

export enum Profile {
  ARTISAN = 'artisan',
  CONSEILLER = 'conseiller',
  MANDATAIRE = 'mandataire',
  PARTICULIER = 'particulier',
}

export enum Status {
  INVALID = 'invalid',
  VALID = 'valid',
  PENDING = 'pending',
}

export enum Type {
  MISSING = 'missing',
  WRONG = 'wrong',
}

export interface ErrorDetails {
  id: string;
  category: Category;
  type: Type;
  code: string;
  title: string;
  problem: string | null;
  solution: string | null;
  provided_value: string | null;
}

export interface QuoteChecksId {
  id: string;
  status: Status;
  profile: Profile;
  valid: boolean;
  errors: string[];
  error_details: ErrorDetails[];
  error_messages: Record<string, string>;
}

interface DataContextType {
  clearPendingDevis: () => void;
  data: QuoteChecksId[];
  updateDevis: (value: QuoteChecksId) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setDataState] = useState<QuoteChecksId[]>([]);

  // Load quotes from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Protect localStorage usage from server-side
      const storedData = localStorage.getItem('quoteCheckData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setDataState(parsedData);
        } catch (error) {
          console.error('Error reading from localStorage:', error);
        }
      }
    }
  }, []);

  // Automatically save updated data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quoteCheckData', JSON.stringify(data));
    }
  }, [data]);

  const updateDevis = (newDevis: QuoteChecksId) => {
    setDataState((prev) => {
      const updatedDevis = prev.filter((d) => d.id !== newDevis.id);
      const newState = [...updatedDevis, newDevis];
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCheckData', JSON.stringify(newState));
      }
      return newState;
    });
  };

  const clearPendingDevis = () => {
    setDataState((prev) => {
      const filteredDevis = prev.filter((d) => d.status !== Status.PENDING);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCheckData', JSON.stringify(filteredDevis));
      }
      return filteredDevis;
    });
  };

  return (
    <DataContext.Provider value={{ data, updateDevis, clearPendingDevis }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
