'use client';

import { StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { BlogItem } from '@/types';

export interface BlogCardProps {
  blog: BlogItem;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="flex flex-col w-full min-w-56 sm:min-w-64 md:min-w-72 lg:min-w-[320px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/1.8] rounded-sm overflow-hidden mb-4 shadow-md hover:shadow-xl transition-all duration-300">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-indigo-slate text-base sm:text-lg font-light leading-tight">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {blog.short_description}
        </p>

        {/* Read More Link */}
        <AppLink
          href={`/blog/${blog.slug}`}
          className="text-indigo-slate text-xs sm:text-sm font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 w-fit group"
        >
          <span>Read More</span>
          <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </AppLink>
      </div>
    </StaggerItem>
  );
};

export default BlogCard;
