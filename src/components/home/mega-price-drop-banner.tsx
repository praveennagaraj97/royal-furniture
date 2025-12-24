'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import megaPriceDropBanner from '@/assets/banner-2.png';

const MegaPriceDropBanner: FC = () => {
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
          src={megaPriceDropBanner}
          alt="Mega Price Drop - Sustainable Furniture"
          width={1200}
          height={500}
          className="w-full h-auto object-cover"
          quality={90}
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
};

export default MegaPriceDropBanner;
