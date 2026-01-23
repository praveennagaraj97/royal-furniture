import ProductResults from '@/components/products/product-results';

interface ProductsPageProps {
  params: Promise<{
    locale: string;
    country: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function ProductsPage({}: ProductsPageProps) {
  return <ProductResults />;
}
