import FurnitureCategories from '@/components/category/furniture-categories';
import Hero from '@/components/category/hero';
import PromotionalBanner from '@/components/category/promotional-banner';
import PromotionalOffers from '@/components/category/promotional-offers';
import SubCategories from '@/components/category/subcategories';
import { categories } from '@/temp/data/categories';
import { categoriesData } from '@/temp/data/categories-data';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Find the category object
  const categoryObj = categories.find((cat) => cat.id === category);

  // If category is 'all' or not found, redirect to home or show 404
  if (!categoryObj || category === 'all') {
    notFound();
  }

  // Get subcategories for this category
  const subcategories = categoriesData[category] || [];

  return (
    <div className="grid gap-6">
      <SubCategories
        selectedCategoryId={category}
        selectedCategoryKey={categoryObj.key}
        subcategories={subcategories}
      />
      <Hero />
      <PromotionalOffers />
      <PromotionalBanner />
      <FurnitureCategories />
      <PromotionalBanner />
    </div>
  );
}
