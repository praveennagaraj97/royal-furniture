'use client';

import { FC } from 'react';
import AccordionItem from '../shared/accordian/item';

const TermsAccordion: FC = () => {
  const data = [
    {
      title: '01. Use of Site',
      content: `The content of this website is for general use and may change without notice.

• Must not be used for fraudulent activities  
• Reproduction of design is prohibited  
• Access may be restricted at our discretion`,
    },
    {
      title: '02. Account Responsibilities',
      content: `You are responsible for maintaining confidentiality of your account.

All activities under your account are your responsibility. We reserve the right to terminate accounts or cancel orders at our discretion.`,
    },
    {
      title: '03. Pricing & Payments',
      content: `All prices are subject to change. Errors may occur and will be corrected when identified.

• Ready-to-ship items have fixed pricing  
• Custom items require advance payment`,
    },
    {
      title: '04. Intellectual Property',
      content: `All content including design, layout, and assets are owned or licensed by us.

Reproduction is strictly prohibited without permission.`,
    },
    {
      title: '05. Governing Law',
      content: `Your use of this website is governed by applicable laws.

Any disputes will be handled under the appropriate jurisdiction.`,
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

export default TermsAccordion;
