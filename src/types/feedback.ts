export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface Feedbacks {
  id: string;
  quote_check_id: string;
  comment: string | null;
  email: string | null;
  is_helpful: boolean | null;
  rating: Rating | null;
}
