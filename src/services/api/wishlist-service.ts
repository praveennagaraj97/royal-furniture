import { API_ROUTES } from '@/constants/api-routes';
import type {
  BaseAPIResponse,
  CreateCollectionPayload,
  CreateCollectionResponse,
} from '@/types/response';
import { BaseAPIService } from './api-base-service';

export interface AddItemPayload {
  variant_id: number;
  collection_id?: number;
}

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

  async addItem(payload: AddItemPayload): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.WISHLIST.ADD_ITEM,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async removeVariant(variantId: number): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.delete<BaseAPIResponse<unknown>>(
        API_ROUTES.WISHLIST.REMOVE_VARIANT(variantId)
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const wishlistService = new WishlistService();
