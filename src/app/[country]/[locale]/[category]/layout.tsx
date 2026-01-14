import SubCategories from '@/components/category/subcategories';
import { ReactNode } from 'react';

interface SubCategoryLayoutProps {
  params: Promise<{
    locale: string;
    category: string;
    country: string;
    subcategory: string;
  }>;
  children: ReactNode;
}

export default async function SubCategoryLayout({
  children,
}: SubCategoryLayoutProps) {
  return (
    <div className="mt-4">
      <SubCategories />
      {children}
    </div>
  );
}
