import CategoryBreadcrumb from '@/components/category/breadcrumb';
import SubCategories from '@/components/category/subcategories';
import { ReactNode } from 'react';

interface SubCategoryLayoutProps {
  params: Promise<{
    locale: string;
    category: string;
    country: string;
  }>;
  children: ReactNode;
}

export default async function SubCategoryLayout({
  children,
}: SubCategoryLayoutProps) {
  return (
    <>
      <CategoryBreadcrumb />
      <SubCategories />
      {children}
    </>
  );
}
