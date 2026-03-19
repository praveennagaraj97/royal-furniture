import Accordion from '@/components/legal-pages/warranty/accordian';
import CTA from '@/components/legal-pages/warranty/cta';
import Hero from '@/components/legal-pages/warranty/hero';
import { NextPage } from 'next';

const WarrantyPage: NextPage = () => {
  return (
    <>
      <Hero />
      <Accordion />
      <CTA />
    </>
  );
};

export default WarrantyPage;
