import { Rating } from '@/types';

const API_CONFIG = {
  headers: {
    accept: 'application/json',
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
  },
};

export const quoteService = {
  async getQuote(quoteCheckId: string) {
    const response = await fetch(`/api/quote_checks/${quoteCheckId}`, {
      headers: API_CONFIG.headers,
    });
    return response.json();
  },

  async sendErrorFeedback(
    comment: string | null,
    errorDetailsId: string,
    quoteCheckId: string
  ) {
    const response = await fetch(
      `/api/quote_checks/${quoteCheckId}/error_details/${errorDetailsId}/feedbacks`,
      {
        method: 'POST',
        headers: { ...API_CONFIG.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      }
    );
    if (!response.ok) throw new Error('Failed to send feedbacks');
    return response.json();
  },

  async sendGlobalFeedback(
    quoteCheckId: string,
    feedback: {
      comment: string | null;
      email: string | null;
      rating: Rating | null;
    }
  ) {
    const response = await fetch(
      `/api/quote_checks/${quoteCheckId}/feedbacks`,
      {
        method: 'POST',
        headers: { ...API_CONFIG.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to send feedback: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  },
};
