import { API_ROUTES } from '@/constants/api-routes';
import type { CartApiResponse, ShippingProceedResponse } from '@/types/cart';
import { BaseAPIService } from './api-base-service';

interface AddItemPayload {
  product_sku: string;
  quantity: number;
}

type QuantityAction = 'increase' | 'decrease';

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

  async removeItem(
    cartItemId: string,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.delete(
        API_ROUTES.CART.REMOVE_ITEM(cartItemId),
        {
          headers,
        },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async updateItemQuantity(
    cartItemId: string,
    action: QuantityAction,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.patch(
        API_ROUTES.CART.UPDATE_ITEM(cartItemId),
        {
          action,
        },
        {
          headers,
        },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async getShippingStep(
    guestSessionId?: string,
  ): Promise<ShippingProceedResponse> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.get<ShippingProceedResponse>(
        API_ROUTES.CART.SHIPPING_PROCEED,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const cartService = new CartService();

export default cartService;
