'use client';

import { ViewOnce } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/contexts/toast-context';
import { cartService } from '@/services/api/cart-service';
import { ParsedAPIError } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { getGuestSession } from '@/utils/guest-session';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi';
import { ImSpinner2 } from 'react-icons/im';

const normalizeAmount = (value?: string | number | null) => {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const FlexiPay: FC = () => {
  const t = useTranslations('checkout.orderSummary.flexiPay');
  const { flexiPayOption, guestSessionId, refreshCart } = useCart();
  const { showError, showSuccess } = useToast();
  const params = useParams<{ country?: string; locale?: string }>();
  const countryCode = params?.country ?? 'ae';
  const locale = params?.locale ?? 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingAction, setUpdatingAction] = useState<
    'enable' | 'disable' | null
  >(null);

  const isAvailable = !!flexiPayOption?.available;
  const isSelected = !!flexiPayOption?.is_selected;

  const paymentSummary = useMemo(() => {
    if (!flexiPayOption) return null;

    return {
      firstPayment: formatCurrency(
        normalizeAmount(flexiPayOption.first_payment),
        countryCode,
        locale,
      ),
      remainingPayment: formatCurrency(
        normalizeAmount(flexiPayOption.remaining_payment),
        countryCode,
        locale,
      ),
      percentage: flexiPayOption.percentage,
    };
  }, [countryCode, flexiPayOption, locale]);

  if (!isAvailable || !paymentSummary) {
    return null;
  }

  const handleUpdateFlexiPay = async (nextValue: boolean) => {
    setUpdatingAction(nextValue ? 'enable' : 'disable');
    try {
      const guestSession = guestSessionId || getGuestSession() || undefined;
      await cartService.updateFlexiPay({ flexi_pay: nextValue }, guestSession);
      await refreshCart();
      showSuccess(nextValue ? t('enabledToast') : t('disabledToast'));
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      showError(parsedError.generalError || t('error'));
    } finally {
      setUpdatingAction(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.12}
        amount={0.01}
        margin="-40px"
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`group w-full rounded-lg p-4 text-left shadow-sm transition-colors duration-200 ${
            isSelected
              ? ' bg-[#f1fbf5] hover:border-[#97d0ae]'
              : ' bg-[#FFF4F4] hover:border-[#e3bcbc]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isSelected
                    ? 'bg-[#007B35]/10 text-[#007B35]'
                    : 'bg-deep-maroon/10 text-deep-maroon'
                }`}
              >
                <GiWallet className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-indigo-slate">
                    {t('title')}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      isSelected
                        ? 'bg-[#007B35] text-white'
                        : 'bg-deep-maroon text-white'
                    }`}
                  >
                    {isSelected ? t('enabled') : t('available')}
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs ${
                    isSelected ? 'text-[#007B35]' : 'text-deep-maroon'
                  }`}
                >
                  {t('cardCopy', {
                    firstPayment: paymentSummary.firstPayment,
                  })}
                </p>
              </div>
            </div>

            <FiChevronRight className="h-5 w-5 shrink-0 text-gray-400 transition-colors group-hover:text-deep-maroon" />
          </div>
        </button>
      </ViewOnce>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="bottom"
        size="md"
        className="sm:max-w-lg"
      >
        <div className="flex h-full flex-col rounded-t-2xl bg-white p-6">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-indigo-slate">
                {t('modal.title')}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {t('modal.subtitle')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-maroon text-white transition-colors hover:bg-[#6b0000]"
              aria-label={t('modal.closeAria')}
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <div className="rounded-2xl bg-[#FFF4F4] p-4 sm:p-5">
              <p className="text-sm font-semibold text-deep-maroon">
                {isSelected ? t('enabled') : t('available')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {t('modal.description', {
                  percentage: paymentSummary.percentage,
                  firstPayment: paymentSummary.firstPayment,
                })}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('modal.firstPaymentLabel')}
                </p>
                <p className="mt-2 text-base font-semibold text-indigo-slate">
                  {paymentSummary.firstPayment}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('modal.remainingLabel')}
                </p>
                <p className="mt-2 text-base font-semibold text-indigo-slate">
                  {paymentSummary.remainingPayment}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-gray-100 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                if (isSelected) {
                  void handleUpdateFlexiPay(false);
                  return;
                }

                setIsModalOpen(false);
              }}
              disabled={updatingAction !== null}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? 'bg-deep-maroon text-white hover:bg-[#6b0000]'
                  : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {updatingAction === 'disable' ? (
                <ImSpinner2 className="animate-spin text-2xl" />
              ) : null}
              <span>{isSelected ? t('disableAction') : t('cancelAction')}</span>
            </button>

            <button
              type="button"
              onClick={() => void handleUpdateFlexiPay(true)}
              disabled={updatingAction !== null || isSelected}
              className="flex items-center justify-center space-x-2 rounded-xl bg-deep-maroon px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6b0000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updatingAction === 'enable' ? (
                <ImSpinner2 className="animate-spin text-2xl" />
              ) : null}
              <span>{t('enableAction')}</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlexiPay;
