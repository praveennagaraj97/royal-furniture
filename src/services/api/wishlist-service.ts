import { API_ROUTES } from '@/constants/api-routes';
import type {
  CreateCollectionPayload,
  CreateCollectionResponse,
} from '@/types/response';
import { BaseAPIService } from './api-base-service';

export class WishlistService extends BaseAPIService {
  async createCollection(
    payload: CreateCollectionPayload
  ): Promise<CreateCollectionResponse> {
    try {
      const response = await this.http.post<CreateCollectionResponse>(
        API_ROUTES.WISHLIST.CREATE_COLLECTION,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const wishlistService = new WishlistService();
