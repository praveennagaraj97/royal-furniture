import { categories } from '@/temp/data/categories';
import { categoriesData } from '@/temp/data/categories-data';
import { FC, ReactNode } from 'react';
import Categories from './categories';
import Header from './header';
import QuickLinksBar from './quick-links-bar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <QuickLinksBar />
      <Header />
      <hr className="text-gray-200 w-full container mx-auto" />
      <Categories categories={categories} categoriesData={categoriesData} />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
