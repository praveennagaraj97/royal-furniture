import PrivacyAccordion from '@/components/legal-pages/privacy-policy/accordian';
import PrivacyCTA from '@/components/legal-pages/privacy-policy/cta';
import PrivacyHero from '@/components/legal-pages/privacy-policy/hero';
import PrivacyIntro from '@/components/legal-pages/privacy-policy/intro';
import { NextPage } from 'next';

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <PrivacyHero />
      <PrivacyIntro />
      <PrivacyAccordion />
      <PrivacyCTA />
    </>
  );
};

export default PrivacyPolicy;
