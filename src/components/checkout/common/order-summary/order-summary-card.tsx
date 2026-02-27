'use client';

import Modal from '@/components/shared/modal';
import Portal from '@/components/shared/portal';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/contexts/toast-context';
import { useIntersectionObserver } from '@/hooks';
import { useTabbyPayment } from '@/hooks/payment-gateway/use-tabby-payment';
import { useTamaraPayment } from '@/hooks/payment-gateway/use-tamara-payment';
import { cartService } from '@/services/api/cart-service';
import { ParsedAPIError } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import {
  FC,
  Fragment,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiCreditCard, FiInfo, FiTruck } from 'react-icons/fi';
import type { CheckoutStepId } from '../../layout/progress';
import ShippingFeesInfo from './shipping-fees-info';

interface StickyCtaProps {
  show: boolean;
  label: string;
  Icon?: FC<{ className?: string }>;
  onClick: () => void;
  id?: string;
  disabled?: boolean;
  price?: string;
}

const StickyCta: FC<StickyCtaProps> = ({
  show,
  label,
  Icon,
  onClick,
  id,
  disabled,
  price,
}) => {
  const t = useTranslations('checkout.orderSummary');
  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            key={id ?? label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-sm pb-safe rounded-t-lg"
          >
            <div className="w-full space-y-2">
              {price ? (
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm text-gray-700 font-medium">
                    {t('totalAmount')}
                  </span>
                  <span className="text-sm font-semibold">{price}</span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={onClick}
                aria-label={label}
                disabled={disabled}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors shadow-md"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{label}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

interface OrderSummaryCardProps {
  step: CheckoutStepId;
}

export const OrderSummaryCard: FC<
  OrderSummaryCardProps & {
    selectedPaymentMethod?: string;
  }
> = ({ step, selectedPaymentMethod }) => {
  const t = useTranslations('checkout.orderSummary');
  const tShipping = useTranslations('shipping');
  const { totals, shipping, guestSessionId, refreshCart } = useCart();
  const { showError } = useToast();
  const router = useRouter();
  const params = useParams<{ country?: string; locale?: string }>();
  const locale = params?.locale ?? 'en';
  const countryCode = params?.country ?? 'ae';
  const totalSavings = totals.discount + totals.coupon;
  const savingsDisplay =
    totalSavings > 0 ? formatCurrency(totalSavings, countryCode, locale) : null;

  const actionBtnRef = useRef<HTMLButtonElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { checkout: tamaraCheckout, isLoading: isTamaraLoading } =
    useTamaraPayment();
  const { checkout: tabbyCheckout, isLoading: isTabbyLoading } =
    useTabbyPayment();

  const isVisible = useIntersectionObserver({
    ref: actionBtnRef,
    options: { rootMargin: '0px 0px -120px 0px' },
  });

  useEffect(() => {
    startTransition(() => setHasMounted(true));
  }, []);

  const summaryRows = useMemo(
    () => [
      {
        label: t('itemPrice'),
        value: formatCurrency(totals.subtotal, countryCode, locale),
      },
      {
        label: t('discountApplied'),
        value:
          totals.discount > 0
            ? `-${formatCurrency(totals.discount, countryCode, locale)}`
            : t('notAvailable'),
        className: totals.discount > 0 ? 'text-[#007B35]' : 'text-gray-400',
      },
      {
        label: t('couponApplied'),
        value:
          totals.coupon > 0
            ? `-${formatCurrency(totals.coupon, countryCode, locale)}`
            : t('notAvailable'),
        className: totals.coupon > 0 ? 'text-[#5c2ea5]' : 'text-gray-400',
      },
      {
        label: t('deliveryCharges'),
        value:
          totals.shipping === 0
            ? t('free')
            : formatCurrency(totals.shipping, countryCode, locale),
        strike: totals.shipping === 0,
      },
    ],
    [totals, countryCode, locale, t],
  );

  const cta = useMemo(() => {
    const buildPath = (...segments: (string | undefined)[]) =>
      '/' + segments.filter(Boolean).join('/');

    const country = params?.country;
    const locale = params?.locale;

    const handleProceedToPayment = async () => {
      setIsSubmitting(true);
      try {
        const payload: Record<string, unknown> = {
          delivery_type: shipping.method,
        };

        if (shipping.method === 'home') {
          payload.is_custom_delivery = shipping.selection.isCustomDelivery;
          if (shipping.selection.isCustomDelivery) {
            payload.date = shipping.selection.date;
            payload.slot_id = shipping.selection.slotId;
          }
        } else if (shipping.method === 'pickup') {
          payload.store_id = shipping.selection.storeId;
          payload.date = shipping.selection.pickupDate;
          payload.slot_id = shipping.selection.pickupSlotId;
        }

        await cartService.proceedToPayment(
          payload,
          guestSessionId || undefined,
        );
        await refreshCart();
        router.push(buildPath(country, locale, 'checkout', 'payment'));
      } catch (error) {
        const parsedError = error as ParsedAPIError;
        showError(
          parsedError.generalError ||
            tShipping('toasts.proceedToPaymentFailed'),
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    if (step === 'cart') {
      return {
        label: t('cta.proceedToShipping'),
        Icon: FiTruck,
        onClick: () =>
          router.push(buildPath(country, locale, 'checkout', 'shipping')),
      };
    }

    if (step === 'shipping') {
      const isPickupIncomplete =
        shipping.method === 'pickup' &&
        (!shipping.selection.storeId ||
          !shipping.selection.pickupDate ||
          !shipping.selection.pickupSlotId);

      const isHomeIncomplete =
        shipping.method === 'home' &&
        shipping.selection.isCustomDelivery &&
        (!shipping.selection.date || !shipping.selection.slotId);

      const isDisabled = isSubmitting || isPickupIncomplete || isHomeIncomplete;

      return {
        label: isSubmitting ? t('cta.saving') : t('cta.proceedToPayment'),
        Icon: FiCreditCard,
        onClick: handleProceedToPayment,
        disabled: isDisabled,
      };
    }

    if (step === 'payment') {
      const isTamaraSelected = selectedPaymentMethod === 'tamara';
      const isTabbySelected = selectedPaymentMethod === 'tabby';

      const handlePayNow = async () => {
        if (
          (!isTamaraSelected && !isTabbySelected) ||
          isTamaraLoading ||
          isTabbyLoading
        ) {
          return;
        }

        try {
          if (isTamaraSelected) {
            await tamaraCheckout();
          } else if (isTabbySelected) {
            await tabbyCheckout();
          }
        } catch (e) {
          const parsedError = e as ParsedAPIError;
          showError(
            parsedError.generalError ||
              'Unable to start payment right now. Please try again.',
          );
        }
      };

      const isLoading = isTamaraLoading || isTabbyLoading;
      const isDisabled = (!isTamaraSelected && !isTabbySelected) || isLoading;

      return {
        label: isLoading ? t('cta.pleaseWait') : t('cta.payNow'),
        Icon: FiCreditCard,
        onClick: handlePayNow,
        disabled: isDisabled,
      };
    }

    return null;
  }, [
    step,
    params?.country,
    params?.locale,
    router,
    isSubmitting,
    shipping,
    guestSessionId,
    refreshCart,
    showError,
    t,
    tShipping,
    selectedPaymentMethod,
    tamaraCheckout,
    isTamaraLoading,
    tabbyCheckout,
    isTabbyLoading,
  ]);

  if (!cta) return null;

  return (
    <Fragment>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6">
        <h2 className="text-lg font-medium">{t('title')}</h2>

        <div className="space-y-4 text-sm text-gray-700">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex justify-between items-center">
              <span
                className={
                  row.strike ? 'line-through text-gray-400' : undefined
                }
              >
                {row.label}
                {row.label === t('deliveryCharges') && (
                  <button
                    type="button"
                    onClick={() => setIsShippingInfoOpen(true)}
                    className="ml-1"
                  >
                    <FiInfo className="inline h-4 w-4 text-gray-400" />
                  </button>
                )}
              </span>

              <span className={`font-semibold ${row.className ?? ''}`}>
                {row.value}
              </span>
            </div>
          ))}

          {totalSavings > 0 && savingsDisplay && (
            <div className="relative overflow-hidden rounded-xl  bg-[#F6FFF3] p-2 text-center text-xs font-medium text-[#1F7A3B] shadow-sm tracking-tighter">
              {t('savingsMessage', { amount: savingsDisplay })}
            </div>
          )}

          <hr className="opacity-20" />

          <div className="flex justify-between bg-[#FFF4F4] p-2 rounded-lg font-medium">
            <span>{t('totalAmount')}</span>
            <span className="font-bold">
              {formatCurrency(totals.total, countryCode, locale)}
            </span>
          </div>
        </div>

        <button
          onClick={cta.onClick}
          ref={actionBtnRef}
          disabled={cta.disabled}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors shadow-md ${cta.disabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-deep-maroon text-white hover:bg-[#6b0000]'}`}
        >
          <cta.Icon className="w-4 h-4" />
          {cta.label}
        </button>
      </div>

      <StickyCta
        show={hasMounted && !isVisible}
        label={cta.label}
        Icon={cta.Icon}
        onClick={cta.onClick}
        disabled={cta.disabled}
        price={formatCurrency(totals.total, countryCode, locale)}
      />

      <Modal
        isOpen={isShippingInfoOpen}
        onClose={() => setIsShippingInfoOpen(false)}
        variant="bottom"
        size="sm"
      >
        <ShippingFeesInfo onClose={() => setIsShippingInfoOpen(false)} />
      </Modal>

      {hasMounted && !isVisible && (
        <StickyCta
          show
          label={cta.label}
          Icon={cta.Icon}
          onClick={cta.onClick}
          disabled={cta.disabled}
          id={`cta-${step}`}
          price={formatCurrency(totals.total, countryCode, locale)}
        />
      )}
    </Fragment>
  );
};
