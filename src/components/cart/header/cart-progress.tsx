'use client';

import { FC } from 'react';
import { FiCreditCard, FiShoppingCart, FiTruck } from 'react-icons/fi';

type StepStatus = 'completed' | 'current' | 'upcoming';

type Step = {
  label: string;
  icon: FC<{ className?: string }>;
  status: StepStatus;
};

const steps: Step[] = [
  { label: 'Cart', icon: FiShoppingCart, status: 'current' },
  { label: 'Shipping', icon: FiTruck, status: 'upcoming' },
  { label: 'Payment', icon: FiCreditCard, status: 'upcoming' },
];

const statusStyles: Record<StepStatus, string> = {
  current: 'bg-deep-maroon text-white border-deep-maroon shadow-md',
  completed: 'bg-deep-maroon text-white border-deep-maroon',
  upcoming: 'bg-white text-gray-500 border-gray-200',
};

export const CartProgress: FC = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;
        const previousCompleted =
          index > 0 && steps[index - 1].status !== 'upcoming';

        return (
          <div key={step.label} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 ${statusStyles[step.status]}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  step.status === 'current'
                    ? 'text-deep-maroon'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className="hidden sm:flex flex-1 h-0.5 mx-2">
                <div
                  className={`w-full rounded-full transition-all duration-300 ${
                    previousCompleted ? 'bg-deep-maroon' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
