'use client';

import Swiper from '@/components/shared/swiper';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { Product } from '@/temp/data/products-data';
import ProductCard from './product-card';

export interface ProductListingProps {
  title: ReactNode;
  seeAllHref: string;
  products: Product[];
}

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

const ProductListing: FC<ProductListingProps> = ({
  title,
  seeAllHref,
  products,
}) => {
  return (
    <motion.section
      className="container mx-auto px-3 overflow-hidden md:overflow-visible pb-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl text-indigo-slate">{title}</div>
        <Link
          href={seeAllHref}
          className="text-indigo-slate text-sm font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 hover:scale-105"
        >
          <span>See All</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Products Swiper */}
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Swiper>
    </motion.section>
  );
};

export default ProductListing;
