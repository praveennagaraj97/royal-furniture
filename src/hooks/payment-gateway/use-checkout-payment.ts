'use client';

import { getApiFetcherClient } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type {
  CheckoutOrderResponse,
  CheckoutType,
  PaymentMethod,
} from '@/types/response/payment-gateway';
import { useCallback, useState } from 'react';

interface UseCheckoutPaymentOptions {
  checkoutType?: CheckoutType;
  notes?: string;
  guestSessionId?: string;
}

interface UseCheckoutPaymentResult {
  isLoading: boolean;
  error?: string;
  data?: CheckoutOrderResponse['data'];
  checkout: (paymentMethod: PaymentMethod) => Promise<void>;
}

export const useCheckoutPayment = (
  options: UseCheckoutPaymentOptions = {},
): UseCheckoutPaymentResult => {
  const { checkoutType = 'normal', notes = '', guestSessionId } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<CheckoutOrderResponse['data'] | undefined>();

  const checkout = useCallback(
    async (paymentMethod: PaymentMethod) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const payload = {
          payment_method: paymentMethod,
          checkout_type: checkoutType,
          notes,
        };

        const headers = guestSessionId
          ? { 'X-Guest-Session': guestSessionId }
          : undefined;

        const client = getApiFetcherClient();
        const response = await client.post<CheckoutOrderResponse>(
          API_ROUTES.ORDERS.CHECKOUT,
          payload,
          { headers },
        );

        const body = response.data;
        setData(body.data);

        const gatewayData = body.data.gateway_data as {
          _links?: { payment?: { href?: string } };
          checkout_url?: string;
        };

        const paymentHref =
          gatewayData?._links?.payment?.href || gatewayData?.checkout_url;

        if (paymentHref) {
          window.location.href = paymentHref;
        }
      } catch (err) {
        const message =
          (err as { generalError?: string }).generalError ||
          'Failed to start checkout payment. Please try again.';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [checkoutType, notes, guestSessionId],
  );

  return {
    isLoading,
    error,
    data,
    checkout,
  };
};

export default useCheckoutPayment;
