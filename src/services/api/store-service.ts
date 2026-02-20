import { API_ROUTES } from '@/constants/api-routes';
import type { StoresByCartResponse } from '@/types/store';
import { BaseAPIService } from './api-base-service';

export class StoreService extends BaseAPIService {
  async getStoresByCart(
    cartId: string,
    guestSessionId?: string,
  ): Promise<StoresByCartResponse> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.get<StoresByCartResponse>(
        API_ROUTES.STORES.BY_CART,
        {
          params: { cart_id: cartId },
          headers,
        },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const storeService = new StoreService();

export default storeService;
