import { API_ROUTES } from '@/constants/api-routes';
import type { CartApiResponse } from '@/types/cart';
import { BaseAPIService } from './api-base-service';

interface AddItemPayload {
  product_sku: string;
  quantity: number;
}

export class CartService extends BaseAPIService {
  async getCart(guestSessionId?: string): Promise<CartApiResponse> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.get<CartApiResponse>(
        API_ROUTES.CART.DETAIL,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async addItem(
    payload: AddItemPayload,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.post(API_ROUTES.CART.ADD_ITEM, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const cartService = new CartService();

export default cartService;
