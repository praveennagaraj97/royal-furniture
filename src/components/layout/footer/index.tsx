'use client';

import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import AppDownloads from './app-downloads';
import BottomBar from './bottom-bar';
import CompanyInfo from './company-info';
import LinkColumn from './link-column';
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
  const contactLinks = [
    'Living Room',
    'Dining Room',
    'Bedroom',
    'Office Furniture',
    'Outdoor',
    'Accessories',
    'Sale Items',
  ];

  const helpLinks = [
    'Contact Us',
    'Track Order',
    'Shipping & Delivery',
    'Returns & Exchanges',
    'FAQ',
    'Size Guide',
    'Assembly Services',
  ];

  const aboutLinks = [
    'About Us',
    'Our Stores',
    'Careers',
    'Blog',
    'Privacy Policy',
    'Terms of Service',
  ];

  return (
    <footer className="bg-soft-pink w-full mt-6">
      <motion.div
        className="container mx-auto px-3 py-6 md:py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Top Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-end justify-between gap-6 pb-6 border-b border-gray-300"
          variants={sectionVariants}
        >
          <CompanyInfo />
          <AppDownloads />
        </motion.div>

        {/* Middle Section - Links */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-gray-300"
          variants={sectionVariants}
        >
          <SupportLinks />
          <LinkColumn title="Contact Us" links={contactLinks} />
          <LinkColumn title="Help" links={helpLinks} />
          <LinkColumn title="About Us" links={aboutLinks} />
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
