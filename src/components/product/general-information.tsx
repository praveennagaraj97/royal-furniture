'use client';

import { ViewOnce } from '@/components/shared/animations';
import { Accordion } from '@/components/shared/ui/accordion';
import type { ProductInfoSection } from '@/types/response';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface GeneralInformationProps {
  description?: string;
  infoSection?: ProductInfoSection;
}

export const GeneralInformation: FC<GeneralInformationProps> = ({
  description,
  infoSection,
}) => {
  const t = useTranslations('product.info');
  const normalizedDescription = description?.trim() ?? '';
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(false);

  // Helper to render data rows
  const renderDataRows = (data: Array<{ label: string; value: string }>) => (
    <div>
      {data.map((item, index) => (
        <div
          key={item.label}
          className={`flex justify-between items-center py-2.5 px-3 ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <span className="text-xs md:text-sm  ">{item.label}</span>
          <span className="text-xs md:text-sm   font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );

  // Dynamically build accordion items from infoSection
  const dynamicAccordionItems = infoSection
    ? Object.entries(infoSection)
        .filter(([, value]) => Array.isArray(value) && value.length > 0)
        .map(([key, value], idx) => ({
          id: key,
          title: key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase()),
          children: renderDataRows(
            value as Array<{ label: string; value: string }>,
          ),
          defaultOpen: !normalizedDescription && idx === 0,
        }))
    : [];

  // If no sections and no description, render nothing
  if (!normalizedDescription && !dynamicAccordionItems.length) {
    return null;
  }

  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.5}
      amount={0.01}
      margin="-40px"
    >
      <div className="space-y-3">
        {!!normalizedDescription && (
          <div className="border-b border-gray-200">
            <button
              type="button"
              onClick={() => setIsGeneralInfoOpen((prev) => !prev)}
              className="flex items-center justify-between w-full py-2 text-left"
              aria-expanded={isGeneralInfoOpen}
            >
              <h2 className="text-base md:text-xl font-medium text-indigo-slate">
                {t('title')}
              </h2>
              <FiChevronDown
                className={`h-4 w-4 text-gray-700 transition-transform duration-200 ${
                  isGeneralInfoOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isGeneralInfoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="leading-relaxed pb-3">
                    {normalizedDescription}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!!dynamicAccordionItems.length && (
          <Accordion items={dynamicAccordionItems} allowMultiple={true} />
        )}
      </div>
    </ViewOnce>
  );
};
