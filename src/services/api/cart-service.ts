import { API_ROUTES } from '@/constants/api-routes';
import type {
  CartApiResponse,
  PaymentProceedResponse,
  ShippingProceedResponse,
  ShippingSubmitPayload,
  ShippingSubmitRequestPayload,
} from '@/types/response/cart';
import type { PromoCodesResponse } from '@/types/response/payment';
import { BaseAPIService } from './api-base-service';

interface AddItemPayload {
  product_sku: string;
  quantity: number;
}

const flattenShippingSubmitPayload = (
  payload: ShippingSubmitPayload,
): ShippingSubmitRequestPayload => {
  const flattened: ShippingSubmitRequestPayload = {
    delivery_method: payload.delivery_method,
  };

  if (payload.address_id !== undefined) {
    flattened.address_id = payload.address_id;
  }

  if (payload.store_id !== undefined) {
    flattened.store_id = payload.store_id;
  }

  if (payload.guest_address) {
    Object.assign(flattened, payload.guest_address);
  }

  if (payload.custom_delivery) {
    if (payload.custom_delivery.is_custom_delivery !== undefined) {
      flattened.is_custom_delivery = payload.custom_delivery.is_custom_delivery;
    }

    if (payload.custom_delivery.slot_id !== undefined) {
      flattened.slot_id = payload.custom_delivery.slot_id;
    }

    if (payload.custom_delivery.delivery_date !== undefined) {
      flattened.delivery_date = payload.custom_delivery.delivery_date;
    }
  }

  return flattened;
};

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
    quantity: number,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.patch(
        API_ROUTES.CART.UPDATE_ITEM(cartItemId),
        {
          quantity,
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

  async saveForLater(
    cartItemId: string,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.post(
        API_ROUTES.CART.SAVE_FOR_LATER(cartItemId),
        {},
        {
          headers,
        },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async moveToCart(
    cartItemId: string,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.post(
        API_ROUTES.CART.MOVE_TO_CART(cartItemId),
        {},
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

  async getPaymentStep(
    guestSessionId?: string,
  ): Promise<PaymentProceedResponse> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.get<PaymentProceedResponse>(
        API_ROUTES.CART.PAYMENT_PROCEED,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async submitShipping(
    payload: ShippingSubmitPayload,
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.patch(
        API_ROUTES.CART.SHIPPING_PROCEED,
        flattenShippingSubmitPayload(payload),
        { headers },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async getPromoCodes(guestSessionId?: string): Promise<PromoCodesResponse> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.get<PromoCodesResponse>(
        API_ROUTES.PAYMENT.PROMOCODES,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async applyPromoCode(
    payload: { promo_val: string },
    guestSessionId?: string,
  ): Promise<unknown> {
    try {
      const headers: Record<string, string> = {};
      if (guestSessionId) headers['X-Guest-Session'] = guestSessionId;

      const response = await this.http.post(
        API_ROUTES.PAYMENT.APPLY_PROMOCODE,
        payload,
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
