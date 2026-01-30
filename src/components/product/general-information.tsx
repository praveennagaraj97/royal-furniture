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
  const dimensions = infoSection?.dimensions || [];
  const specifications = infoSection?.specs || [];
  const warrantyAndCare = infoSection?.warranty || [];
  const assembly = infoSection?.assembly || [];
  const renderDataRows = (data: Array<{ label: string; value: string }>) => {
    return (
      <div>
        {data.map((item, index) => (
          <div
            key={item.label}
            className={`flex justify-between items-center py-2.5 px-3 ${
              index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <span className="text-xs md:text-sm text-gray-900">
              {item.label}
            </span>
            <span className="text-xs md:text-sm text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const accordionItems = [
    {
      id: 'dimensions',
      title: 'Dimension',
      children: renderDataRows(dimensions),
      defaultOpen: true,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      children: renderDataRows(specifications),
      defaultOpen: false,
    },
    {
      id: 'warranty',
      title: 'Warranty and care',
      children: renderDataRows(warrantyAndCare),
      defaultOpen: false,
    },
    {
      id: 'assembly',
      title: 'Assembly',
      children: renderDataRows(assembly),
      defaultOpen: false,
    },
  ];

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

        <Accordion items={accordionItems} allowMultiple={true} />
      </div>
    </ViewOnce>
  );
};
