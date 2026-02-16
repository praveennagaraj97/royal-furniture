'use client';

import { FC, useMemo } from 'react';
import { FiCheck, FiCreditCard, FiShoppingCart, FiTruck } from 'react-icons/fi';

type StepStatus = 'completed' | 'current' | 'upcoming';

interface Step {
  label: string;
  icon: FC<{ className?: string }>;
  status: StepStatus;
}

const steps: Step[] = [
  { label: 'Cart', icon: FiShoppingCart, status: 'current' },
  { label: 'Shipping', icon: FiTruck, status: 'upcoming' },
  { label: 'Payment', icon: FiCreditCard, status: 'upcoming' },
];

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

export const CartProgress: FC = () => {
  const currentIndex = useMemo(
    () => steps.findIndex((step) => step.status === 'current'),
    [],
  );

  const progressPercent = useMemo(() => {
    if (steps.length <= 1) {
      return 100;
    }
    if (currentIndex <= 0) {
      return 100 / steps.length;
    }
    return (currentIndex / (steps.length - 1)) * 100;
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-[40%] h-1.5 w-full -translate-y-1/2 rounded-full bg-[#d6d7df]" />
        <div
          className="absolute left-0 top-[40%] h-1.5 -translate-y-1/2 rounded-full bg-[#f8c6c8] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const showCheck =
            step.status === 'current' || step.status === 'completed';

          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-1 flex-col items-center gap-2"
            >
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${indicatorStyles[step.status]}`}
              >
                <Icon className="h-5 w-5" />
                {showCheck && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white text-deep-maroon">
                    <FiCheck className="h-3 w-3" />
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${labelStyles[step.status]}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
