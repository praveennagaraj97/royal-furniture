'use client';

import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import image from '@/assets/exclusive-offer.png';

const SofaAndSeating: FC = () => {
  return (
    <div className="max-w-dvw overflow-x-hidden">
      <div className="container mx-auto px-3 mb-4">
        <SectionTitleTag
          title="Sofas & seating"
          className="text-xl font-semibold"
        />
      </div>
      <motion.div
        className="relative w-full rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 1.05, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={image}
          alt="Royal Furniture - Promotional Offer"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          quality={90}
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
};

export default SofaAndSeating;
