export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface Feedbacks {
  id: string;
  quote_check_id: string;
  comment: string | null;
  email: string | null;
  rating: Rating | null;
}
