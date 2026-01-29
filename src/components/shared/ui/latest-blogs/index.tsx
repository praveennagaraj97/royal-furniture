'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { BlogItem } from '@/types';
import BlogCard from './blog-card';

const LatestBlogs: FC<{ blogs: BlogItem[] }> = ({ blogs }) => {
  const t = useTranslations();

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="section-container overflow-hidden md:overflow-visible pb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="lg:text-2xl md:text-xl text-lg text-indigo-slate font-semibold">
          Latest Blogs
        </h2>
        <AppLink
          href="/blogs"
          className="text-indigo-slate sm:text-sm text-xs font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 hover:scale-105"
        >
          <span>{t('common.seeAll')}</span>
          <FiChevronRight className="sm:w-4 sm:h-4 w-2 h-2 rtl:rotate-180" />
        </AppLink>
      </div>

      {/* Blogs Swiper */}
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default LatestBlogs;
