'use client';

import { useLayoutData } from '@/contexts/layout-context';
import { useStickyHeader } from '@/hooks/use-sticky-header';
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
  const { categories } = useLayoutData();

  return (
    <>
      <div className="hidden lg:block">
        <QuickLinksBar />
      </div>
      <Header ref={headerRef} isSticky={isSticky} />
      {/* Spacer to prevent layout shift when header becomes sticky */}
      {isSticky && headerHeight > 0 && (
        <div style={{ height: `${headerHeight}px` }} aria-hidden="true" />
      )}
      <hr className="text-gray-200 w-full container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3" />
      {categories && categories.length > 0 && (
        <Categories ref={categoryRef} categories={categories} />
      )}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
