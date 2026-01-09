'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

// Example data (fallback)
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop';

export interface DropdownColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface DropdownData {
  columns: DropdownColumn[];
  image?: string;
}

interface CategoryDropdownProps {
  isOpen: boolean;
  data: DropdownData | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  isOpen,
  data,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-2xl border-t border-gray-100 overflow-hidden z-50 pt-8 pb-10"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto xl:px-12 lg:px-10 px-6">
            <div className="flex gap-8">
              {/* Links Columns */}
              <div className="flex-1 grid grid-cols-4 gap-8">
                {data.columns.map((column, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-base">
                      {column.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {column.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            href={link.href}
                            className="text-[15px] text-gray-600 hover:text-[#7F1D1D] transition-colors block py-0.5"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Image */}
              <div className="w-100 shrink-0">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={data.image || DEFAULT_IMAGE}
                    alt="Featured category"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryDropdown;
