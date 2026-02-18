'use client';

import Modal from '@/components/shared/modal';
import { useCart } from '@/contexts/cart-context';
import { useIntersectionObserver } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
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
import type { CheckoutStepId } from '../../layout/checkout-progress';
import ShippingFeesInfo from './shipping-fees-info';

const formatCurrency = (currency: string, amount: number) => {
  return `${currency}${amount.toFixed(0)}`;
};

interface OrderSummaryCardProps {
  step: CheckoutStepId;
}

export const OrderSummaryCard: FC<OrderSummaryCardProps> = ({ step }) => {
  const { currency, totals } = useCart();

  const router = useRouter();
  const params = useParams<{ country?: string; locale?: string }>();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isVisible = useIntersectionObserver({ ref: cardRef });

  useEffect(() => {
    startTransition(() => {
      setHasMounted(true);
    });
  }, []);

  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);

  const summaryRows = useMemo(
    () => [
      {
        label: 'Item Price',
        value: formatCurrency(currency, totals.subtotal),
        emphasis: 'default' as const,
      },
      {
        label: 'Discount Applied',
        value:
          totals.discount > 0
            ? `-${formatCurrency(currency, totals.discount)}`
            : `${currency}0`,
        emphasis: 'positive' as const,
      },
      {
        label: 'Coupon Applied',
        value:
          totals.coupon > 0
            ? `-${formatCurrency(currency, totals.coupon)}`
            : `${currency}0`,
        emphasis: 'accent' as const,
      },
      {
        label: 'Delivery Charges',
        value:
          totals.shipping === 0
            ? 'Free'
            : formatCurrency(currency, totals.shipping),
        emphasis: totals.shipping === 0 ? 'positive' : 'default',
      },
    ],
    [currency, totals],
  );

  const ctaConfig = useMemo(() => {
    const buildPath = (...segments: (string | undefined)[]) => {
      const filtered = segments.filter(Boolean) as string[];
      if (!filtered.length) return '/';
      return `/${filtered.join('/')}`;
    };

    const country = params?.country as string | undefined;
    const locale = params?.locale as string | undefined;

    if (step === 'cart') {
      return {
        label: 'Proceed to Shipping',
        href: buildPath(country, locale, 'checkout', 'shipping'),
        Icon: FiTruck,
      } as const;
    }

    if (step === 'shipping') {
      return {
        label: 'Proceed to Payment',
        href: buildPath(country, locale, 'checkout', 'payment'),
        Icon: FiCreditCard,
      } as const;
    }

    return null;
  }, [params?.country, params?.locale, step]);

  const handleProceed = () => {
    if (!ctaConfig) return;
    router.push(ctaConfig.href);
  };

  return (
    <Fragment>
      <div
        ref={cardRef}
        className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6"
      >
        <h2 className="text-lg font-medium  ">Order Summary</h2>
        <div className="space-y-4">
          {summaryRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-sm text-gray-700"
            >
              <span className="flex items-center gap-1">
                <span
                  className={
                    row.label === 'Delivery Charges' && totals.shipping === 0
                      ? 'line-through text-gray-400'
                      : ''
                  }
                >
                  {row.label}
                </span>
                {row.label === 'Delivery Charges' && (
                  <span className="relative inline-flex">
                    <button
                      type="button"
                      onClick={() => setIsShippingInfoOpen((open) => !open)}
                      className="inline-flex items-center justify-center"
                    >
                      <FiInfo className="h-4 w-4 text-gray-400 hover:text-indigo-slate cursor-pointer" />
                    </button>
                  </span>
                )}
              </span>
              <span
                className={`font-semibold ${
                  row.emphasis === 'positive'
                    ? 'text-[#007B35]'
                    : row.emphasis === 'accent'
                      ? 'text-[#5c2ea5]'
                      : ' '
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Saved Badge */}

          {totals.discount + totals.coupon > 0 && (
            <div className="font-medium bg-[#91E809] px-2 py-2 rounded-md text-sm text-center">
              You Saved{' '}
              <span className="font-semibold">
                {formatCurrency(currency, totals.discount + totals.coupon)}
              </span>{' '}
              on this order
            </div>
          )}

          <hr className="opacity-20 my-3" />

          <div className="bg-deep-maroon/5 p-2 rounded-lg border-gray-200 flex items-center justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-deep-maroon">
              {formatCurrency(currency, totals.total)}
            </span>
          </div>
        </div>

        {ctaConfig && (
          <>
            {/* Inline CTA inside card (all breakpoints) */}
            <div className="">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors duration-200 shadow-md"
              >
                <ctaConfig.Icon className="w-4 h-4" />
                <span>{ctaConfig.label}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sticky mobile CTA at bottom when card is not visible */}
      {ctaConfig && (
        <AnimatePresence>
          {hasMounted && !isVisible && (
            <motion.div
              key={`sticky-cta-${step}`}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-sm"
            >
              <button
                type="button"
                onClick={handleProceed}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors duration-200 shadow-md"
              >
                <ctaConfig.Icon className="w-4 h-4" />
                <span>{ctaConfig.label}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <Modal
        isOpen={isShippingInfoOpen}
        onClose={() => setIsShippingInfoOpen(false)}
        variant="bottom"
        size="sm"
        className="sm:max-w-md"
      >
        <ShippingFeesInfo onClose={() => setIsShippingInfoOpen(false)} />
      </Modal>
    </Fragment>
  );
};
