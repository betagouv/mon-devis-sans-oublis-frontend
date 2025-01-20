import { Profile, Rating } from '@/types';

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

  async getQuoteMetadata() {
    const metadataUrl = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_METADATA;

    if (!metadataUrl) {
      throw new Error('NEXT_PUBLIC_API_QUOTE_CHECKS_METADATA is not defined.');
    }

    try {
      const response = await fetch(metadataUrl, {
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw error;
    }
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

  async uploadQuote(
    file: File,
    metadata: { aides: string[]; gestes: string[] },
    profile: Profile
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('profile', profile);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch('/api/quote_checks', {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error while creating the quote.');
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error("The API didn't return an ID.");
    }

    return data;
  },
};
