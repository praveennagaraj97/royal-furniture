import SubCategories from '@/components/category/subcategories';

interface SubCategoryLayoutProps {
  params: Promise<{
    locale: string;
    category: string;
    country: string;
    subcategory: string;
  }>;
}

export default async function SubCategoryLayout({}: SubCategoryLayoutProps) {
  return (
    <div className="grid gap-6 mt-4">
      <SubCategories />
    </div>
  );
}
