'use client';

import { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Tooltip = ({ content, children, className }: TooltipProps) => {
  return (
    <div
      className={`relative inline-flex items-center group ${className ?? ''}`}
    >
      {children}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
