import SubCategories from '@/components/category/subcategories';
import { categoriesData } from '@/temp/data/categories-data';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Get subcategories for this category
  const subcategories = categoriesData['sofa'] || [];

  return (
    <div className="grid gap-6">
      <SubCategories />
      {/* <Hero />
      <PromotionalOffers />
      <PromotionalBanner />
      <FurnitureCategories />
      <PromotionalBanner /> */}
    </div>
  );
}
