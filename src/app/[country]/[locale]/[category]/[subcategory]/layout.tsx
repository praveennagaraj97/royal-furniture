import { Breadcrumb } from '@/components/shared/ui/breadcrumb';
import { FC, ReactNode } from 'react';

interface SubCategoryLayoutProps {
  params: Promise<{
    locale: string;
    category: string;
    country: string;
    subcategory: string;
  }>;
  children: ReactNode;
}

const SubCategoryLayout: FC<SubCategoryLayoutProps> = async ({
  children,
  params,
}) => {
  const { category, subcategory } = await params;
  return (
    <div className="mt-4">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: category, href: `/${category}` },
          { label: subcategory, href: `/${category}/${subcategory}` },
        ]}
      />
      {children}
    </div>
  );
};

export default SubCategoryLayout;
