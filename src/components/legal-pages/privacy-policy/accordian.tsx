'use client';

import { FC } from 'react';
import AccordionItem from '../shared/accordian/item';

const PrivacyAccordion: FC = () => {
  const data = [
    {
      title: 'Data Collection',
      content: `We collect information that you provide directly to us, including your name, address, and preferences.

• Personal identifiers for delivery coordination  
• Transaction history for personalized service`,
    },
    {
      title: 'How We Use Your Info',
      content: `We use your data to enhance your experience and improve services.

• Tailored recommendations  
• Customer support and service optimization`,
    },
    {
      title: 'Third-Party Sharing',
      content: `We do not sell your data. Information is only shared with trusted partners strictly for operational purposes such as delivery and payments.`,
    },
    {
      title: 'Cookies & Navigation',
      content: `We use cookies and similar technologies to improve browsing experience, remember preferences, and optimize performance.`,
    },
    {
      title: 'Your Rights',
      content: `You have full control over your data.

• Access your data  
• Update or correct information  
• Request deletion of your data`,
    },
  ];

  return (
    <section className="bg-[#faf9f8] py-8 md:py-14">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl text-[#1a1c1c] mb-4">
            Privacy Overview
          </h2>

          <div className="h-1 w-12 bg-[var(--color-deep-maroon)] mx-auto" />
        </div>

        {/* Items */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyAccordion;
