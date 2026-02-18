'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import Modal from '@/components/shared/modal';
import { FC, startTransition, useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface Promo {
  id: string;
  code: string;
  description: string;
}

interface PromosModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedCode?: string | null;
  onApply: (code: string) => void;
}

const PROMOS: Promo[] = [
  {
    id: 'wc500',
    code: 'WC500',
    description:
      'Shop for AED 1999 Get Additional 500 Off. Use Code WC500. Valid on first homeware Order',
  },
  {
    id: 'big1',
    code: 'BIG1',
    description:
      'Shop for AED 1999 Get Additional 500 Off. Use Code WC500. Valid on first homeware Order',
  },
];

const PromosModal: FC<PromosModalProps> = ({
  isOpen,
  onClose,
  appliedCode,
  onApply,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!appliedCode) return;
    const match = PROMOS.find((p) => p.code === appliedCode);
    startTransition(() => {
      if (match) setSelectedId(match.id);
    });
  }, [appliedCode]);

  const selected = useMemo(
    () => PROMOS.find((p) => p.id === selectedId),
    [selectedId],
  );

  const handleContinue = () => {
    if (selected) onApply(selected.code);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="bottom" size="md">
      <div className="sticky top-0 z-10 bg-white backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-4 py-3">
        <h3 className="text-base font-medium">View / Enter code</h3>
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
            <span className="text-deep-maroon font-medium">Apply Offer</span>
          </div>

          <FormInput
            rightElement={
              <div className="bg-[#4DBF5C] text-sm rounded-md text-gray-50 px-1.5 py-1 font-medium">
                Offer Applied
              </div>
            }
          />
        </div>

        <div className="space-y-5">
          {PROMOS.map((promo) => (
            <label
              key={promo.id}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="promo"
                checked={selectedId === promo.id}
                onChange={() => setSelectedId(promo.id)}
                className="mt-1 w-4 h-4"
              />
              <div>
                <div className="font-semibold text-sm">{promo.code}</div>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-md">
                  {promo.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full rounded-lg bg-deep-maroon py-3 text-base font-medium text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default PromosModal;
