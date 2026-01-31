'use client';

import { ViewOnce } from '@/components/shared/animations';
import { Accordion } from '@/components/shared/ui/accordion';
import type { ProductInfoSection } from '@/types/response';
import type { FC } from 'react';

export interface GeneralInformationProps {
  description?: string;
  infoSection?: ProductInfoSection;
}

export const GeneralInformation: FC<GeneralInformationProps> = ({
  description,
  infoSection,
}) => {
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
          <span className="text-xs md:text-sm text-gray-900">{item.label}</span>
          <span className="text-xs md:text-sm text-gray-900 font-medium">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );

  // Dynamically build accordion items from infoSection
  const dynamicAccordionItems = infoSection
    ? Object.entries(infoSection)
        .filter(([_key, value]) => Array.isArray(value) && value.length > 0)
        .map(([key, value], idx) => ({
          id: key,
          title:
            key === 'dimensions'
              ? 'Dimension'
              : key === 'specs'
                ? 'Specifications'
                : key === 'warranty'
                  ? 'Warranty and care'
                  : key === 'assembly'
                    ? 'Assembly'
                    : key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase()),
          children: renderDataRows(
            value as Array<{ label: string; value: string }>,
          ),
          defaultOpen: idx === 0,
        }))
    : [];

  // If no sections and no description, render nothing
  if ((!dynamicAccordionItems.length && !description) || !infoSection) {
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
        <div>
          <h2 className="text-base md:text-xl font-semibold text-indigo-slate mb-2">
            General Information
          </h2>
          <p className="leading-relaxed">{description}</p>
        </div>
        {!!dynamicAccordionItems.length && (
          <Accordion items={dynamicAccordionItems} allowMultiple={true} />
        )}
      </div>
    </ViewOnce>
  );
};
