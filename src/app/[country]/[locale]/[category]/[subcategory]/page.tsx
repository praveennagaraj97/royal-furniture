import SubcategoryDetail from '@/components/category/subcategory-detail';

interface SubCategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
    country: string;
    subcategory: string;
  }>;
}

export default async function SubCategoryPage({
  params,
}: SubCategoryPageProps) {
  const { subcategory } = await params;

  // TODO: Fetch products from API
  // const products = await ecommerceService.getSubcategoryProducts(subcategory, {
  //   country,
  //   locale,
  // });

  // For now, pass empty array to use dummy data
  return <SubcategoryDetail products={[]} />;
}
