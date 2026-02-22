import { API_ROUTES } from '@/constants/api-routes';
import { cartService } from '@/services/api/cart-service';
import type { PromoCodesResponse } from '@/types/response/payment';
import { getGuestSession } from '@/utils/guest-session';
import useSWR from 'swr';

export function useGetPromoCodes() {
  const guestSessionId = getGuestSession() || undefined;

  const { data, error, isLoading, mutate } = useSWR<PromoCodesResponse>(
    API_ROUTES.PAYMENT.PROMOCODES,
    () => cartService.getPromoCodes(guestSessionId),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    promoCodes: data?.data || [],
    isLoading,
    error,
    mutate,
  };
}
