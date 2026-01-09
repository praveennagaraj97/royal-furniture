'use client';

import type { CategoryWithSubCategories } from '@/types';
import { type FC, type ReactNode, createContext, useContext } from 'react';

interface LayoutContextType {
  categories: CategoryWithSubCategories[];
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
  categories: CategoryWithSubCategories[];
}

export const LayoutProvider: FC<LayoutProviderProps> = ({
  children,
  categories,
}) => {
  return (
    <LayoutContext.Provider value={{ categories }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutData = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
};
