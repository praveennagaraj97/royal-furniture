'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import AppDownloads from './app-downloads';
import BottomBar from './bottom-bar';
import CompanyInfo from './company-info';
import LinkColumn from './link-column';
import MobileFooterLinks, { type FooterCategory } from './mobile-footer-links';
import SupportLinks from './support-links';

const Footer: FC = () => {
  const tSections = useTranslations('footer.sections');
  const tContactLinks = useTranslations('footer.links.contact');
  const tHelpLinks = useTranslations('footer.links.help');
  const tAboutLinks = useTranslations('footer.links.about');

  const contactLinks = [
    tContactLinks('livingRoom'),
    tContactLinks('diningRoom'),
    tContactLinks('bedroom'),
    tContactLinks('officeFurniture'),
    tContactLinks('outdoor'),
    tContactLinks('accessories'),
    tContactLinks('saleItems'),
  ];

  const helpLinks = [
    tHelpLinks('contactUs'),
    tHelpLinks('trackOrder'),
    tHelpLinks('shippingDelivery'),
    tHelpLinks('returnsExchanges'),
    tHelpLinks('faq'),
    tHelpLinks('sizeGuide'),
    tHelpLinks('assemblyServices'),
  ];

  const aboutLinks = [
    tAboutLinks('aboutUs'),
    tAboutLinks('ourStores'),
    tAboutLinks('careers'),
    tAboutLinks('blog'),
    tAboutLinks('privacyPolicy'),
    tAboutLinks('termsOfService'),
  ];

  const footerCategories: FooterCategory[] = [
    {
      id: 'quicklinks',
      title: tSections('quickLinks'),
      links: contactLinks,
    },
    {
      id: 'help',
      title: tSections('help'),
      links: helpLinks,
    },
    {
      id: 'about',
      title: tSections('aboutUs'),
      links: aboutLinks,
    },
  ];

  return (
    <footer className="bg-soft-pink w-full mt-6">
      <StaggerContainer
        staggerChildren={0.1}
        delayChildren={0.1}
        className="section-container py-6 md:py-8"
      >
        {/* Top Section */}
        <StaggerItem
          type="slideUp"
          distance={20}
          duration={0.5}
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-300"
        >
          <CompanyInfo />
          <AppDownloads />
        </StaggerItem>

        {/* Middle Section - Links */}
        <StaggerItem
          type="slideUp"
          distance={20}
          duration={0.5}
          className="lg:py-6 py-2 border-b border-gray-300"
        >
          {/* Mobile View - Accordion */}
          <div className="lg:hidden">
            <MobileFooterLinks categories={footerCategories} />
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            <SupportLinks />
            <LinkColumn title={tSections('quickLinks')} links={contactLinks} />
            <LinkColumn title={tSections('help')} links={helpLinks} />
            <LinkColumn title={tSections('aboutUs')} links={aboutLinks} />
          </div>
        </StaggerItem>

        {/* Bottom Section */}
        <StaggerItem type="slideUp" distance={20} duration={0.5}>
          <BottomBar />
        </StaggerItem>
      </StaggerContainer>
    </footer>
  );
};

export default Footer;
