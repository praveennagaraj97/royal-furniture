'use client';

import { motion, type Variants } from 'framer-motion';
import { HelpCircle, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import facebookIcon from '@/assets/social/facebook.png';
import instagramIcon from '@/assets/social/insta.png';
import xIcon from '@/assets/social/twitter.png';
import youtubeIcon from '@/assets/social/youtube.png';

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
  const t = useTranslations('footer.support');
  const tSocial = useTranslations('footer.social');

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-gray-900 font-bold text-base">{t('title')}</h3>
      <div className="flex flex-col gap-3">
        {/* Call Customer Support */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <Phone className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('callCustomerSupport')}
            </span>
            <span className="text-gray-600 text-sm">2942 87687 989</span>
          </div>
        </motion.div>

        {/* Write to us */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('writeToUs')}
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </motion.div>

        {/* Help Center */}
        <motion.div className="flex items-start gap-3" variants={itemVariants}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <HelpCircle className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('helpCenter')}
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </motion.div>
      </div>

      {/* Social Media Icons */}
      <motion.div
        className="flex items-center gap-3 pt-2"
        variants={containerVariants}
      >
        {/* Instagram */}
        <motion.a
          href="#"
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <Image
            src={instagramIcon}
            alt={tSocial('instagram')}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </motion.a>
        {/* Facebook */}
        <motion.a
          href="#"
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <Image
            src={facebookIcon}
            alt={tSocial('facebook')}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </motion.a>
        {/* X */}
        <motion.a
          href="#"
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <Image
            src={xIcon}
            alt={tSocial('x')}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </motion.a>
        {/* YouTube */}
        <motion.a
          href="#"
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          variants={itemVariants}
        >
          <Image
            src={youtubeIcon}
            alt={tSocial('youtube')}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default SupportLinks;
