'use client';

import { ViewOnce } from '@/components/shared/animations';
import { type FC, type ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const alignmentClass =
    align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <ViewOnce
      type="slideUp"
      distance={16}
      duration={0.65}
      className={`${alignmentClass} ${className}`.trim()}
    >
      {eyebrow ? (
        <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-deep-maroon/80 sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-montserrat text-3xl font-semibold tracking-tight text-indigo-slate sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
          {description}
        </div>
      ) : null}
    </ViewOnce>
  );
};

export default SectionHeading;
