'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { blogsData } from '@/temp/data/blogs-data';
import BlogCard from './blog-card';

const LatestBlogs: FC = () => {
  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible pb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="lg:text-2xl md:text-xl text-lg text-indigo-slate font-semibold">
          Latest Blogs
        </h2>
        <Link
          href="/blogs"
          className="text-indigo-slate sm:text-sm text-xs font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 hover:scale-105"
        >
          <span>See All</span>
          <ChevronRight className="sm:w-4 sm:h-4 w-2 h-2" />
        </Link>
      </div>

      {/* Blogs Swiper */}
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {blogsData.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default LatestBlogs;
