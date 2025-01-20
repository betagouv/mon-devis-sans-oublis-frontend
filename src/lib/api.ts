import { Profile, Rating } from '@/types';

const API_CONFIG = {
  headers: {
    accept: 'application/json',
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
  },
};

export const quoteService = {
  async getQuote(quoteCheckId: string) {
    const quoteUrl = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID;

    if (!quoteUrl) {
      throw new Error('NEXT_PUBLIC_API_QUOTE_CHECKS_ID is not defined.');
    }

    try {
      const url = quoteUrl.replace(':quote_check_id', quoteCheckId);

      const response = await fetch(url, {
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch quote: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
    }
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
        throw new Error(
          `Failed to fetch metadata: ${response.status} ${response.statusText}`
        );
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
    const feedbackUrl =
      process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID_ERROR_DETAILS_ID_FEEDBACKS;

    if (!feedbackUrl) {
      throw new Error(
        'NEXT_PUBLIC_API_QUOTE_CHECKS_ID_ERROR_DETAILS_ID_FEEDBACKS is not defined.'
      );
    }

    try {
      const url = feedbackUrl
        .replace(':quote_check_id', quoteCheckId)
        .replace(':error_detail_id', errorDetailsId);

      const response = await fetch(url, {
        method: 'POST',
        headers: { ...API_CONFIG.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send feedback: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  },

  async sendGlobalFeedback(
    quoteCheckId: string,
    feedback: {
      comment: string | null;
      email: string | null;
      rating: Rating | null;
    }
  ) {
    const globalFeedbackUrl =
      process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID_FEEDBACKS;

    if (!globalFeedbackUrl) {
      throw new Error(
        'NEXT_PUBLIC_API_QUOTE_CHECKS_ID_FEEDBACKS is not defined.'
      );
    }

    try {
      const url = globalFeedbackUrl.replace(':quote_check_id', quoteCheckId);

      const response = await fetch(url, {
        method: 'POST',
        headers: { ...API_CONFIG.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send feedbacks: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending feedbacks:', error);
      throw error;
    }
  },

  async uploadQuote(
    file: File,
    metadata: { aides: string[]; gestes: string[] },
    profile: Profile
  ) {
    const uploadUrl = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS;

    if (!uploadUrl) {
      throw new Error('NEXT_PUBLIC_API_QUOTE_CHECKS is not defined.');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('profile', profile);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          ...API_CONFIG.headers,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Error while creating the quote: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.id) {
        throw new Error("The API didn't return an ID.");
      }

      return data;
    } catch (error) {
      console.error('Error while uploading the quote:', error);
      throw error;
    }
  },
};
