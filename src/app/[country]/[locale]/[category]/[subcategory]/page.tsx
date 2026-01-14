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

  return <div className="grid gap-6 mt-4">tag</div>;
}
