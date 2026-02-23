import { API_ROUTES } from '@/constants/api-routes';
import { BaseAPIService } from '@/services/api/api-base-service';

class OrderService extends BaseAPIService {
  cancelOrder(payload: {
    order_id: string;
    reason: string;
    custom_reason?: string;
  }) {
    return this.http.post(API_ROUTES.ORDERS.CANCEL, payload);
  }

  requestRefund(payload: {
    order_id: string;
    reason: string;
    custom_reason?: string;
  }) {
    return this.http.post(API_ROUTES.ORDERS.REFUND_REQUEST, payload);
  }
}

export const orderService = new OrderService();
