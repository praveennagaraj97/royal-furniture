'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitleBackground from '../svgs/section-title-background';

export interface SectionTitleTagProps {
  title: string;
  className?: string;
}

const SectionTitleTag: FC<SectionTitleTagProps> = ({
  title,
  className = '',
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [title, className]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <SectionTitleBackground
          className="absolute top-0 left-0 -z-10"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        />
      )}
      <p
        ref={textRef}
        className={` z-10 whitespace-nowrap px-8 py-2 text-white ${className} w-fit`}
      >
        {title}
      </p>
    </motion.div>
  );
};

export default SectionTitleTag;
