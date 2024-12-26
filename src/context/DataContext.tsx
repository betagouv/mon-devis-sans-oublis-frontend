'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
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

export interface QuoteChecks {
  id: string;
  status: Status;
  profile: Profile;
  valid: boolean;
  errors: string | null;
  error_details: string | null;
  error_messages: string[] | null;
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
  data: QuoteChecks | QuoteChecksId | null;
  setData: (value: QuoteChecks | QuoteChecksId) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setDataState] = useState<QuoteChecks | QuoteChecksId | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quoteCheckData');
      if (storedData) {
        try {
          setDataState(JSON.parse(storedData));
        } catch (error) {
          console.error('Failed to parse localStorage data:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem('quoteCheckData', JSON.stringify(data));
    }
  }, [data]);

  const setData = (value: QuoteChecks | QuoteChecksId) => {
    setDataState(value);
  };

  return (
    <DataContext.Provider value={{ data, setData }}>
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
