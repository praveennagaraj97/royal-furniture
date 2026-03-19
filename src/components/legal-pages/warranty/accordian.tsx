'use client';

import { FC } from 'react';
import AccordionItem from '../shared/accordian/item';

const data = [
  {
    title: 'What is the duration of the Royal Warranty?',
    content:
      'All signature collections are covered by a 10-year structural warranty and a 2-year upholstery warranty.',
  },
  {
    title: 'What exactly is covered?',
    content:
      'Covers manufacturing defects including frame integrity, spring failure, and joint issues.',
  },
  {
    title: 'How do I initiate a warranty claim?',
    content:
      'Contact support with your order number and attach product images.',
  },
  {
    title: 'Are there any exclusions?',
    content:
      'Does not cover environmental damage, misuse, or third-party modifications.',
  },
  {
    title: 'Transferability of Protection',
    content:
      'Warranty is tied to the original purchaser with limited transfer options.',
  },
];

const Accordion: FC = () => {
  return (
    <section className="bg-[#faf9f8] py-8 md:py-14">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl text-[#1a1c1c] mb-4">
            Frequently Asked Questions
          </h2>

          {/* Accent line */}
          <div className="h-1 w-12 bg-deep-maroon mx-auto" />
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
