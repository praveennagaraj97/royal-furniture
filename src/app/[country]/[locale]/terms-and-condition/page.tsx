import TermsContent from '@/components/legal-pages/terms-and-condition/content';
import TermsHero from '@/components/legal-pages/terms-and-condition/hero';
import { NextPage } from 'next';

const TermsAndCondition: NextPage = () => {
  return (
    <>
      <TermsHero />
      <TermsContent />
    </>
  );
};

export default TermsAndCondition;
