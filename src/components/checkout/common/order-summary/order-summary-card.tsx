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
import type { CheckoutStepId } from '../../layout/progress';
import ShippingFeesInfo from './shipping-fees-info';

/* ---------------- utils ---------------- */

const formatCurrency = (currency: string, amount: number) =>
  `${currency}${amount.toFixed(0)}`;

/* ---------------- sticky cta ---------------- */

interface StickyCtaProps {
  show: boolean;
  label: string;
  Icon?: FC<{ className?: string }>;
  onClick: () => void;
  id?: string;
}

const StickyCta: FC<StickyCtaProps> = ({ show, label, Icon, onClick, id }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={id ?? label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="
            sm:hidden
            fixed inset-x-0 bottom-0 z-40
            bg-white border-t border-gray-200
            px-4 py-2.5 shadow-sm
            pb-safe
          "
        >
          <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors shadow-md"
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------------- order summary ---------------- */

interface OrderSummaryCardProps {
  step: CheckoutStepId;
}

export const OrderSummaryCard: FC<OrderSummaryCardProps> = ({ step }) => {
  const { currency, totals } = useCart();
  const router = useRouter();
  const params = useParams<{ country?: string; locale?: string }>();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);

  const isVisible = useIntersectionObserver({
    ref: cardRef,
    options: { rootMargin: '0px 0px -120px 0px' },
  });

  useEffect(() => {
    startTransition(() => setHasMounted(true));
  }, []);

  /* ---------- summary rows ---------- */

  const summaryRows = useMemo(
    () => [
      {
        label: 'Item Price',
        value: formatCurrency(currency, totals.subtotal),
      },
      {
        label: 'Discount Applied',
        value:
          totals.discount > 0
            ? `-${formatCurrency(currency, totals.discount)}`
            : `${currency}0`,
        className: 'text-[#007B35]',
      },
      {
        label: 'Coupon Applied',
        value:
          totals.coupon > 0
            ? `-${formatCurrency(currency, totals.coupon)}`
            : `${currency}0`,
        className: 'text-[#5c2ea5]',
      },
      {
        label: 'Delivery Charges',
        value:
          totals.shipping === 0
            ? 'Free'
            : formatCurrency(currency, totals.shipping),
        strike: totals.shipping === 0,
      },
    ],
    [currency, totals],
  );

  /* ---------- CTA config ---------- */

  const cta = useMemo(() => {
    const buildPath = (...segments: (string | undefined)[]) =>
      '/' + segments.filter(Boolean).join('/');

    const country = params?.country;
    const locale = params?.locale;

    if (step === 'cart') {
      return {
        label: 'Proceed to Shipping',
        Icon: FiTruck,
        onClick: () =>
          router.push(buildPath(country, locale, 'checkout', 'shipping')),
      };
    }

    if (step === 'shipping') {
      return {
        label: 'Proceed to Payment',
        Icon: FiCreditCard,
        onClick: () =>
          router.push(buildPath(country, locale, 'checkout', 'payment')),
      };
    }

    if (step === 'payment') {
      return {
        label: 'Pay Now',
        Icon: FiCreditCard,
        onClick: () => alert('Pay Now clicked (stub)'),
      };
    }

    return null;
  }, [step, params?.country, params?.locale, router]);

  if (!cta) return null;

  /* ---------- render ---------- */

  return (
    <Fragment>
      <div
        ref={cardRef}
        className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6"
      >
        <h2 className="text-lg font-medium">Order Summary</h2>

        <div className="space-y-4 text-sm text-gray-700">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex justify-between items-center">
              <span
                className={
                  row.strike ? 'line-through text-gray-400' : undefined
                }
              >
                {row.label}
                {row.label === 'Delivery Charges' && (
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

          {totals.discount + totals.coupon > 0 && (
            <div className="bg-[#91E809] rounded-md px-2 py-2 text-center font-medium">
              You Saved{' '}
              <span className="font-semibold">
                {formatCurrency(currency, totals.discount + totals.coupon)}
              </span>
            </div>
          )}

          <hr className="opacity-20" />

          <div className="flex justify-between bg-deep-maroon/5 p-2 rounded-lg font-medium">
            <span>Total Amount</span>
            <span>{formatCurrency(currency, totals.total)}</span>
          </div>
        </div>

        {/* inline CTA */}
        <button
          onClick={cta.onClick}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors shadow-md"
        >
          <cta.Icon className="w-4 h-4" />
          {cta.label}
        </button>
      </div>

      {/* sticky CTA */}
      {hasMounted && !isVisible && (
        <StickyCta
          show
          label={cta.label}
          Icon={cta.Icon}
          onClick={cta.onClick}
          id={`cta-${step}`}
        />
      )}

      <Modal
        isOpen={isShippingInfoOpen}
        onClose={() => setIsShippingInfoOpen(false)}
        variant="bottom"
        size="sm"
      >
        <ShippingFeesInfo onClose={() => setIsShippingInfoOpen(false)} />
      </Modal>
    </Fragment>
  );
};
