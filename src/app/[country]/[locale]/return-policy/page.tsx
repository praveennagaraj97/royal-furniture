import ReturnsContent from '@/components/legal-pages/return-policy/accordian';
import ReturnsCTA from '@/components/legal-pages/return-policy/cta';
import ReturnsHero from '@/components/legal-pages/return-policy/hero';
import { NextPage } from 'next';

const ReturnPolicy: NextPage = () => {
  return (
    <>
      <ReturnsHero />
      <ReturnsContent />
      <ReturnsCTA />
    </>
  );
};

export default ReturnPolicy;
