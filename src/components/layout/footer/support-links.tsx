'use client';

import { motion, type Variants } from 'framer-motion';
import { HelpCircle, Mail, Phone } from 'lucide-react';
import { FC } from 'react';

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

const SupportLinks: FC = () => {
  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-gray-900 font-bold text-base">Support</h3>
      <div className="flex flex-col gap-3">
        {/* Call Customer Support */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 shrink-0">
            <Phone className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              Call Customer Support
            </span>
            <span className="text-gray-600 text-sm">2942 87687 989</span>
          </div>
        </motion.div>

        {/* Write to us */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 shrink-0">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              Write to us
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </motion.div>

        {/* Help Center */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 shrink-0">
            <HelpCircle className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              Help Center
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </motion.div>
      </div>

      {/* Social Media Icons Placeholders */}
      <motion.div
        className="flex items-center gap-3 pt-2"
        variants={containerVariants}
      >
        {/* Instagram */}
        <motion.div
          className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <span className="text-white text-xs font-bold">IG</span>
        </motion.div>
        {/* Facebook */}
        <motion.div
          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <span className="text-white text-xs font-bold">f</span>
        </motion.div>
        {/* Twitter */}
        <motion.div
          className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <span className="text-white text-xs font-bold">X</span>
        </motion.div>
        {/* YouTube */}
        <motion.div
          className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <span className="text-white text-xs font-bold">YT</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SupportLinks;
