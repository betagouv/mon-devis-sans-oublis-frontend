export enum Category {
  ADMIN = 'admin',
  FILE = 'file',
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
  geste_id: string;
  category: Category;
  type: Type;
  code: string;
  title: string;
  problem: string | null;
  solution: string | null;
  provided_value: string | null;
}

export interface Gestes {
  id: string;
  intitule: string;
}

export interface GestesGroup {
  group: string;
  values: string[];
}

export interface Metadata {
  aides: string[];
  gestes: GestesGroup[];
}

export interface QuoteChecksId {
  id: string;
  parent_id: string;
  status: Status;
  filename: string;
  metadata: Metadata;
  profile: Profile;
  valid: boolean;
  gestes: Gestes[];
  errors: string[];
  error_details: ErrorDetails[];
  error_messages: Record<string, string>;
}

export interface EnrichedErrorDetails extends ErrorDetails {
  modalContent: {
    problem: string | null;
    solution: string | null;
    isOpen: boolean;
    title: string;
  };
}

export interface QuoteChecksIdEnrichedErrorDetails {
  id: string;
  parent_id: string;
  status: Status;
  filename: string;
  profile: Profile;
  valid: boolean;
  errors: string[];
  error_details: EnrichedErrorDetails[];
  error_messages: Record<string, string>;
}
