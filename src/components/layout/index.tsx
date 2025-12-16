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
  return (
    <>
      <QuickLinksBar />
      <Header />
      <hr className="text-gray-200 w-full container mx-auto px-2" />
      <Categories categories={categories} categoriesData={categoriesData} />
      <main className="mt-4">{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
