import { BaseAPIService } from './api-base-service';

interface CreateReviewPayload {
  product_slug: string;
  rating: number;
  content?: string;
  images?: File[];
}

class ReviewService extends BaseAPIService {
  async createReview(payload: CreateReviewPayload) {
    const formData = new FormData();

    formData.append('product_slug', payload.product_slug);
    formData.append('rating', String(payload.rating));

    if (payload.content) {
      formData.append('content', payload.content);
    }

    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((file) => {
        formData.append('images', file);
      });
    }

    try {
      const response = await this.http.post('/review/review/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const reviewService = new ReviewService();
