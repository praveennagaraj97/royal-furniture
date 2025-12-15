'use client';

import { motion } from 'framer-motion';
import { Route, Store, Truck } from 'lucide-react';
import { FC } from 'react';

type QuickLink = {
  label: string;
  icon: typeof Truck;
};

const primaryLinks: QuickLink[] = [
  { label: 'Free shipping', icon: Truck },
  { label: 'Click & Collect', icon: Store },
  { label: 'Track Order', icon: Route },
];

const secondaryLinks = ['Store Locator', 'Help', 'Sell With Us'];

const QuickLinksBar: FC = () => {
  return (
    <div className="bg-soft-pink text-indigo-slate">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-6">
          {primaryLinks.map(({ label, icon: Icon }, index) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 text-sm font-semibold"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.25,
                ease: 'easeOut',
              }}
              whileHover={{ y: -1 }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          {secondaryLinks.map((label, index) => (
            <motion.a
              key={label}
              href="#"
              className="transition-colors hover:text-indigo-700"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.05,
                duration: 0.25,
                ease: 'easeOut',
              }}
              whileHover={{ y: -1 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinksBar;
