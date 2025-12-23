'use client';

import { Link } from '@/i18n/routing';
import { motion, type Variants } from 'framer-motion';
import { Heart, MapPin, Package, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

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

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const QuickLinksGrid: FC = () => {
  const t = useTranslations('user.quickLinks');

  const quickLinks = [
    {
      key: 'myOrders',
      icon: Package,
      href: '#',
    },
    {
      key: 'myProfile',
      icon: User,
      href: '/user/profile',
    },
    {
      key: 'wishlist',
      icon: Heart,
      href: '#',
    },
    {
      key: 'savedAddresses',
      icon: MapPin,
      href: '#',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <motion.div key={link.key} variants={itemVariants}>
            <Link
              href={link.href}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-sm shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group"
            >
              <Icon className="h-6 w-6 text-deep-maroon shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-deep-maroon transition-colors duration-300">
                {t(link.key)}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default QuickLinksGrid;
