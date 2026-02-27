'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { FiCheck, FiCreditCard, FiShoppingCart, FiTruck } from 'react-icons/fi';

type StepStatus = 'completed' | 'current' | 'upcoming';

export type CheckoutStepId = 'cart' | 'shipping' | 'payment';

interface Step {
  id: CheckoutStepId;
  label: string;
  icon: FC<{ className?: string }>;
}

const baseSteps: Omit<Step, 'label'>[] = [
  { id: 'cart', icon: FiShoppingCart },
  { id: 'shipping', icon: FiTruck },
  { id: 'payment', icon: FiCreditCard },
];

export const getCheckoutSteps = (
  t: ReturnType<typeof useTranslations<'checkout.progress'>>,
) => baseSteps.map(({ id, icon }) => ({ id, icon, label: t(`steps.${id}`) }));

const indicatorStyles: Record<StepStatus, string> = {
  current: 'bg-[#f8c6c8] text-deep-maroon border border-[#f3aeb3]',
  completed: 'bg-deep-maroon text-white border border-deep-maroon',
  upcoming: 'bg-white text-gray-400 border border-[#d7d8e0]',
};

const labelStyles: Record<StepStatus, string> = {
  current: 'text-deep-maroon',
  completed: 'text-deep-maroon',
  upcoming: 'text-gray-400',
};

interface CheckoutProgressProps {
  currentStep: CheckoutStepId;
}

export const CheckoutProgress: FC<CheckoutProgressProps> = ({
  currentStep,
}) => {
  const t = useTranslations('checkout.progress');
  const router = useRouter();
  const params = useParams<{ country?: string; locale?: string }>();

  const resolveHref = (stepId: CheckoutStepId) => {
    const segments = [
      params?.country ?? '',
      params?.locale ?? '',
      'checkout',
      stepId,
    ].filter(Boolean);

    return `/${segments.join('/')}`;
  };

  const localizedSteps = useMemo(() => getCheckoutSteps(t), [t]);

  const currentIndex = useMemo(() => {
    const index = localizedSteps.findIndex((step) => step.id === currentStep);
    return index === -1 ? 0 : index;
  }, [currentStep, localizedSteps]);

  const stepsWithStatus = useMemo(() => {
    return localizedSteps.map((step, index) => {
      let status: StepStatus = 'upcoming';
      if (index < currentIndex) status = 'completed';
      else if (index === currentIndex) status = 'current';
      return { ...step, status };
    });
  }, [currentIndex, localizedSteps]);

  const progressPercent = useMemo(() => {
    const totalSteps = baseSteps.length;
    if (totalSteps <= 1) {
      return 100;
    }
    const minimumPercent = 100 / (totalSteps * 2);
    if (currentIndex <= 0) {
      return minimumPercent;
    }
    return (currentIndex / (totalSteps - 1)) * 100;
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-[40%] h-1 sm:h-1.5 w-full -translate-y-1/2 rounded-full bg-[#d6d7df]" />
        <motion.div
          className="absolute left-0 top-[40%] h-1 sm:h-1.5 -translate-y-1/2 rounded-full bg-[#f8c6c8]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        {stepsWithStatus.map((step) => {
          const Icon = step.icon;
          const showCheck =
            step.status === 'current' || step.status === 'completed';
          const isClickable = step.status === 'completed';
          const handleClick = () => {
            if (!isClickable) return;
            router.push(resolveHref(step.id));
          };

          return (
            <button
              type="button"
              key={step.label}
              onClick={handleClick}
              disabled={!isClickable}
              aria-current={step.status === 'current' ? 'step' : undefined}
              className={`relative z-10 flex flex-1 flex-col items-center gap-1 sm:gap-2 focus-visible:outline-none ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all duration-300 ${indicatorStyles[step.status]}`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                {showCheck && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-white bg-white text-deep-maroon">
                    <FiCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${labelStyles[step.status]}`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
