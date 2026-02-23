'use client';

import { getApiFetcherClient } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type {
  CheckoutOrderResponse,
  CheckoutType,
  PaymentMethod,
} from '@/types/response/payment-gateway';
import { useCallback, useState } from 'react';

interface UseTamaraPaymentOptions {
  checkoutType?: CheckoutType;
}

interface UseTamaraPaymentResult {
  isLoading: boolean;
  error?: string;
  data?: CheckoutOrderResponse['data'];
  checkout: () => Promise<void>;
}

export const useTamaraPayment = (
  options: UseTamaraPaymentOptions = {},
): UseTamaraPaymentResult => {
  const { checkoutType = 'normal' } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<CheckoutOrderResponse['data'] | undefined>();

  const checkout = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const payload: {
        payment_method: PaymentMethod;
        checkout_type: CheckoutType;
        notes: string;
      } = {
        payment_method: 'tamara',
        checkout_type: checkoutType,
        // Always send dummy notes as empty string for Tamara checkout
        notes: '',
      };

      const client = getApiFetcherClient();
      const response = await client.post<CheckoutOrderResponse>(
        API_ROUTES.ORDERS.CHECKOUT,
        payload,
      );

      const body = response.data;
      setData(body.data);

      const gatewayData = body.data.gateway_data as
        | { checkout_url?: string }
        | undefined;

      if (gatewayData?.checkout_url) {
        window.location.href = gatewayData.checkout_url;
      }
    } catch (err) {
      const message =
        (err as { generalError?: string }).generalError ||
        'Failed to start Tamara checkout. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkoutType]);

  return {
    isLoading,
    error,
    data,
    checkout,
  };
};

export default useTamaraPayment;
