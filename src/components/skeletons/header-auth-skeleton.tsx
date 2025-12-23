import { type FC } from 'react';

export const HeaderAuthSkeleton: FC = () => {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pr-3 text-sm font-medium bg-gray-50 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-200" />
      <div className="h-4 w-24 rounded bg-gray-200" />
    </div>
  );
};
