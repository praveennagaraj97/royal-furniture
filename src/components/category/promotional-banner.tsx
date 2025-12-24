'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import promotionalBanner from '@/assets/promotional_banner.png';

const PromotionalBanner: FC = () => {
  return (
    <div className="container mx-auto px-3">
      <motion.div
        className="relative w-full rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 1.05, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={promotionalBanner}
          alt="Royal Furniture - Promotional Offer"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          quality={90}
        />
      </motion.div>
    </div>
  );
};

export default PromotionalBanner;
