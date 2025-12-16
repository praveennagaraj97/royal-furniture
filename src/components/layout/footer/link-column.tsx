'use client';

import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';

export interface LinkColumnProps {
  title: string;
  links: string[];
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const linkContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const LinkColumn: FC<LinkColumnProps> = ({ title, links }) => {
  return (
    <motion.div className="flex flex-col gap-2" variants={itemVariants}>
      <h3 className="text-gray-900 font-bold text-base">{title}</h3>
      <motion.ul
        className="flex flex-col gap-1.5"
        variants={linkContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {links.map((link, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href="#"
              className="text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
            >
              {link}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default LinkColumn;
