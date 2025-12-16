'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Swiper from '../../shared/swiper';
import CategoryCard, { Subcategory } from './category-card';

interface CategoryDetailProps {
  selectedCategoryId: string;
  selectedCategoryKey: string;
  subcategories: Subcategory[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.15,
    },
  },
};

const CategoryDetail: FC<CategoryDetailProps> = ({
  selectedCategoryId,
  selectedCategoryKey,
  subcategories,
}) => {
  const t = useTranslations('categories');

  return (
    <motion.div
      key={selectedCategoryId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden"
    >
      <div className="pt-4">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl font-semibold text-indigo-slate mb-4 container mx-auto px-2"
        >
          {t(selectedCategoryKey)}
        </motion.h2>

        <div className="bg-soft-pink">
          <div className="container mx-auto px-2 py-4">
            <Swiper className="px-0" gap={3} showNavigation hideArrowOnMobile>
              {subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="min-w-[45%] sm:min-w-[35%] md:min-w-[25%] lg:min-w-[200px]"
                >
                  <CategoryCard subcategory={subcategory} index={index} />
                </motion.div>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDetail;
