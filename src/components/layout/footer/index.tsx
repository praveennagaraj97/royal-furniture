'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import AppDownloads from './app-downloads';
import BottomBar from './bottom-bar';
import CompanyInfo from './company-info';
import LinkColumn from './link-column';
import MobileFooterLinks, { type FooterCategory } from './mobile-footer-links';
import SupportLinks from './support-links';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

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
      id: 'contact',
      title: tSections('contactUs'),
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
      <motion.div
        className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-6 md:py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Top Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-300"
          variants={sectionVariants}
        >
          <CompanyInfo />
          <AppDownloads />
        </motion.div>

        {/* Middle Section - Links */}
        <motion.div
          className="lg:py-6 py-2 border-b border-gray-300"
          variants={sectionVariants}
        >
          {/* Mobile View - Accordion */}
          <div className="lg:hidden">
            <MobileFooterLinks categories={footerCategories} />
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            <SupportLinks />
            <LinkColumn title={tSections('contactUs')} links={contactLinks} />
            <LinkColumn title={tSections('help')} links={helpLinks} />
            <LinkColumn title={tSections('aboutUs')} links={aboutLinks} />
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={sectionVariants}>
          <BottomBar />
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
