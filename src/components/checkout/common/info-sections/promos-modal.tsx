'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import Modal from '@/components/shared/modal';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/contexts/toast-context';
import { useGetPromoCodes } from '@/hooks/api/use-get-promo-codes';
import { cartService } from '@/services/api/cart-service';
import { ParsedAPIError } from '@/types';
import { getGuestSession } from '@/utils/guest-session';
import { useTranslations } from 'next-intl';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface PromosModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedCode?: string | null;
  onApply: (code: string) => void;
}

const PromosModal: FC<PromosModalProps> = ({
  isOpen,
  onClose,
  appliedCode,
  onApply,
}) => {
  const t = useTranslations('checkout.cart.promos');
  const { promoCodes, isLoading } = useGetPromoCodes();
  const { showError, showSuccess } = useToast();
  const { refreshCart } = useCart();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (!appliedCode) return;
    const match = promoCodes.find((p) => p.code === appliedCode);
    startTransition(() => {
      if (match) {
        setSelectedId(match.id);
        setInputValue(match.code);
      } else {
        setInputValue(appliedCode);
      }
    });
  }, [appliedCode, promoCodes]);

  const handleSelect = (id: number, code: string) => {
    setSelectedId(id);
    setInputValue(code);
  };

  const handleContinue = async () => {
    if (!inputValue) return;

    setIsApplying(true);
    try {
      const guestSessionId = getGuestSession() || undefined;
      await cartService.applyPromoCode(
        { promo_val: inputValue },
        guestSessionId,
      );

      // Revalidate cart details to reflect applied promo code
      await refreshCart();

      showSuccess(t('applySuccess'));
      onApply(inputValue);
      onClose();
    } catch (error) {
      const err = error as ParsedAPIError;
      showError(err.generalError || 'Failed to apply promo code');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="bottom" size="md">
      <div className="sticky top-0 z-10 bg-white backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-4 py-3">
        <h3 className="text-base font-medium">{t('modalTitle')}</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full bg-deep-maroon flex items-center justify-center"
        >
          <FiX className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="px-4 pt-5 pb-2 overflow-y-auto max-h-[60vh] space-y-4">
        <div className="relative mb-6">
          <div className="absolute left-4 -top-3.5 bg-white z-10 p-1 text-sm">
            <span className="text-deep-maroon font-medium">
              {t('applyOffer')}
            </span>
          </div>

          <FormInput
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setSelectedId(null);
            }}
            placeholder="Enter promo code"
            rightElement={
              appliedCode === inputValue && inputValue !== '' ? (
                <div className="bg-[#4DBF5C] text-sm rounded-md text-gray-50 px-1.5 py-1 font-medium">
                  {t('offerApplied')}
                </div>
              ) : null
            }
          />
        </div>

        <div className="space-y-5">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-deep-maroon"></div>
            </div>
          ) : (
            promoCodes.map((promo) => (
              <label
                key={promo.id}
                className="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="promo"
                  checked={selectedId === promo.id}
                  onChange={() => handleSelect(promo.id, promo.code)}
                  className="mt-1 w-4 h-4"
                />
                <div>
                  <div className="font-semibold text-sm">{promo.code}</div>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-md">
                    {promo.description}
                  </p>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleContinue}
          disabled={!inputValue || isApplying}
          className="w-full rounded-lg bg-deep-maroon py-3 text-base font-medium text-white disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isApplying ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : null}
          {t('continue')}
        </button>
      </div>
    </Modal>
  );
};

export default PromosModal;
