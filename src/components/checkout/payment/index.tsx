'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { useGetCartPaymentStep } from '@/hooks/api';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { OrderSummarySection } from '../common/order-summary';

export const PaymentPageContent: FC = () => {
  const t = useTranslations('checkout.payment');
  const [selected, setSelected] = useState<string>('card-1');

  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isHydrated, guestSessionId } = useCart();

  const shouldFetchPayment = useMemo(
    () =>
      isHydrated &&
      !isAuthLoading &&
      (isAuthenticated || (!isAuthenticated && !!guestSessionId)),
    [isHydrated, isAuthLoading, isAuthenticated, guestSessionId],
  );

  const {
    data: paymentResponse,
    isLoading: isPaymentLoading,
    isValidating: isPaymentValidating,
  } = useGetCartPaymentStep({
    guestSessionId,
    enabled: shouldFetchPayment,
  });

  const paymentData = paymentResponse?.data;
  const isPaymentFetching = isPaymentLoading || isPaymentValidating;

  const savedCards = paymentData?.payments?.saved_cards || [];
  const otherMethods = paymentData?.payments?.other_payment_options || [];
  const wallets = paymentData?.payments?.wallets || [];

  if (isPaymentFetching && !paymentData) {
    return <div>Loading...</div>; // Or a proper skeleton
  }

  return (
    <div className="section-container">
      <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-medium text-gray-900">
                  {t('title')}
                </h2>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-indigo-slate">
                {t('creditDebitTitle')}
              </h3>

              <div className="space-y-3">
                {savedCards.map((card) => (
                  <button
                    key={card.method}
                    type="button"
                    onClick={() => setSelected(card.method)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === card.method ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        {card.display_name}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected === card.method}
                        onChange={() => setSelected(card.method)}
                        aria-label={card.display_name}
                      />
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setSelected('add-card')}
                  className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === 'add-card' ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <FiPlus className="h-4 w-4 text-deep-maroon" />
                    <span className="font-medium">{t('addNewCard')}</span>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="payment"
                      checked={selected === 'add-card'}
                      onChange={() => setSelected('add-card')}
                      aria-label={t('addNewCard')}
                    />
                  </div>
                </button>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-indigo-slate">
                {t('otherMethodsTitle')}
              </h3>

              <div className="space-y-3">
                {wallets.map((m) => (
                  <button
                    key={m.method}
                    type="button"
                    onClick={() => setSelected(m.method)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === m.method ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="h-6 w-20 flex items-center">
                      <Image
                        src={m.icon_url}
                        alt={m.display_name}
                        className="object-contain h-6 w-auto"
                        width={80}
                        height={24}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">
                        {m.display_name}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected === m.method}
                        onChange={() => setSelected(m.method)}
                        aria-label={m.display_name}
                      />
                    </div>
                  </button>
                ))}
                {otherMethods.map((m) => (
                  <button
                    key={m.method}
                    type="button"
                    onClick={() => setSelected(m.method)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === m.method ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="h-6 w-20 flex items-center">
                      <Image
                        src={m.icon_url}
                        alt={m.display_name}
                        className="object-contain h-6 w-auto"
                        width={80}
                        height={24}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">
                        {m.display_name}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected === m.method}
                        onChange={() => setSelected(m.method)}
                        aria-label={m.display_name}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </StaggerItem>
        </div>

        <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
          <StaggerItem type="slideUp" distance={30}>
            <OrderSummarySection step="payment" showPaymentPlans={true} />
          </StaggerItem>

          {/* Pay Now is provided inside OrderSummaryCard for the payment step */}
        </div>
      </StaggerContainer>
    </div>
  );
};

export default PaymentPageContent;
