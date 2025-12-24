'use client';

import { useStickyHeader } from '@/hooks/use-sticky-header';
import { categories } from '@/temp/data/categories';
import { categoriesData } from '@/temp/data/categories-data';
import { FC, ReactNode } from 'react';
import Categories from './categories';
import Footer from './footer';
import Header from './header';
import QuickLinksBar from './quick-links-bar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { isSticky, headerHeight, headerRef, categoryRef } = useStickyHeader();

  return (
    <>
      <QuickLinksBar />
      <Header ref={headerRef} isSticky={isSticky} />
      {/* Spacer to prevent layout shift when header becomes sticky */}
      {isSticky && headerHeight > 0 && (
        <div style={{ height: `${headerHeight}px` }} aria-hidden="true" />
      )}
      <hr className="text-gray-200 w-full container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3" />
      <Categories
        ref={categoryRef}
        categories={categories}
        categoriesData={categoriesData}
      />
      <main className="mt-4">{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
