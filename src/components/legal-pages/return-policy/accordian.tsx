'use client';

import { FC } from 'react';

import { SlideIn } from '@/components/shared/animations';
import AccordionItem from '../shared/accordian/item';

const ReturnsContent: FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Sidebar */}
        <div className="md:col-span-4">
          <SlideIn direction="up">
            <h2 className="text-2xl md:text-3xl text-[#1a1c1c] mb-4 leading-tight">
              A Commitment to Excellence.
            </h2>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <p className="text-[#44474c] leading-relaxed mb-6">
              We understand that curating your perfect home is a journey. Our
              returns process is designed to be seamless and refined.
            </p>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <div className="p-5 bg-[#fff2f2] border-l-2 border-[var(--color-deep-maroon)]">
              <p className="text-xs uppercase tracking-wider text-[var(--color-deep-maroon)] mb-2">
                Concierge Assistance
              </p>
              <p className="text-sm text-[#1a1c1c]">
                Need help with a return? Our specialists are available for
                support.
              </p>
            </div>
          </SlideIn>
        </div>

        {/* Accordion */}
        <div className="md:col-span-8">
          <ReturnsAccordion />
        </div>
      </div>
    </section>
  );
};

export default ReturnsContent;

const ReturnsAccordion: FC = () => {
  const data = [
    {
      title: '30-Day Return Window',
      content: `All standard collection pieces are eligible for return within 30 calendar days of delivery.

This allows you to experience the piece in your space and ensure it meets expectations.`,
    },
    {
      title: 'Condition of Items',
      content: `Items must be returned in original condition with all packaging and documentation intact.

Used or damaged items are not eligible for full refund.`,
    },
    {
      title: 'Restocking & Transportation Fees',
      content: `A 15% restocking fee applies to all returns. Delivery charges are non-refundable.

Additional pickup logistics fees may apply.`,
    },
    {
      title: 'Initiating Your Return',
      content: `Log into your account and navigate to your orders.

Request a return and our concierge team will contact you within 24 hours.`,
    },
    {
      title: 'Non-Returnable Bespoke Items',
      content: `Custom-made or commissioned items are final sale and cannot be returned once production begins.`,
      noBg: true, // 👈 important
    },
  ];

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};
