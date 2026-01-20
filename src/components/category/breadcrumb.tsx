'use client';

import { useLayoutData } from '@/contexts/layout-context';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../shared/ui/breadcrumb';

const CategoryBreadcrumb: FC = () => {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    product: productSlug,
  } = useParams();
  const { categories } = useLayoutData();
  const selectedCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  const selectedSubcategory = selectedCategory?.subCategories?.find(
    (subcategory) => subcategory.slug === subcategorySlug,
  );

  // if (!subcategorySlug) {
  //   return <div className="mt-4"></div>;
  // }

  return (
    <Breadcrumb
      items={
        [
          { label: 'Home', href: '/' },
          { label: selectedCategory?.name, href: `/${selectedCategory?.slug}` },
          selectedSubcategory
            ? {
                label: selectedSubcategory?.name as string,
                href: `/${selectedCategory?.slug}/${selectedSubcategory?.slug}`,
              }
            : undefined,
          productSlug
            ? { label: productSlug.toString().replaceAll('-', ' '), href: '#' }
            : undefined,
        ].filter(Boolean) as BreadcrumbItem[]
      }
    />
  );
};

export default CategoryBreadcrumb;
