'use client';

import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Blog } from '@/temp/data/blogs-data';

export interface BlogCardProps {
  blog: Blog;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col w-full min-w-[280px] sm:min-w-[300px] md:min-w-[320px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/1.8] rounded-sm overflow-hidden mb-4 shadow-md hover:shadow-xl transition-all duration-300">
        <Image
          src={blog.image}
          alt={blog.imageAlt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-indigo-slate text-lg sm:text-xl font-light leading-tight">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {blog.description}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="text-indigo-slate text-sm sm:text-base font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 w-fit group"
        >
          <span>Read More</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
