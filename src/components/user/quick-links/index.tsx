'use client';

import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import ExclusiveOffersBanner from './exclusive-offers-banner';
import QuickLinksGrid from './quick-links-grid';

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

const UserPageContent: FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <ExclusiveOffersBanner />
      <QuickLinksGrid />
    </motion.div>
  );
};

export default UserPageContent;

