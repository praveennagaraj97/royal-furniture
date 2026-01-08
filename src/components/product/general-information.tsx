'use client';

import { ViewOnce } from '@/components/shared/animations';
import { Accordion } from '@/components/shared/ui/accordion';
import type { FC } from 'react';

export interface GeneralInformationProps {
  description?: string;
  dimensions?: Array<{ label: string; value: string }>;
  specifications?: Array<{ label: string; value: string }>;
  warrantyAndCare?: Array<{ label: string; value: string }>;
  assembly?: Array<{ label: string; value: string }>;
}

export const GeneralInformation: FC<GeneralInformationProps> = ({
  description = 'This premium sofa offers a perfect blend of style and comfort, featuring high-quality materials and a modern design to enhance any living space.',
  dimensions = [
    { label: 'Upholstery Material', value: 'Fabric' },
    { label: 'Frame Material', value: 'Wood & MDF' },
    { label: 'Leg Type', value: 'Polymer' },
  ],
  specifications = [
    { label: 'Seating Capacity', value: '6 Seater' },
    { label: 'No. of Throw pillows', value: 'Nill' },
    { label: 'Colour', value: 'Grey' },
  ],
  warrantyAndCare = [
    { label: 'Warranty Period', value: '2 Years' },
    { label: 'Care Instructions', value: 'Dry clean only' },
  ],
  assembly = [
    { label: 'Assembly Required', value: 'Yes' },
    { label: 'Assembly Time', value: '30-45 minutes' },
    { label: 'Tools Required', value: 'Screwdriver, Allen key' },
  ],
}) => {
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
            <span className="text-sm text-gray-900">{item.label}</span>
            <span className="text-sm text-gray-900">{item.value}</span>
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
      margin="-100px"
    >
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-indigo-slate mb-2">
            General Information
          </h2>
          <p className=" text-gray-900 leading-relaxed">{description}</p>
        </div>

        <Accordion items={accordionItems} allowMultiple={true} />
      </div>
    </ViewOnce>
  );
};
