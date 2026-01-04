import { ProductDetail } from '@/components/product';
import { ProductDetailData } from '@/components/product/types';
import { Breadcrumb } from '@/components/shared/ui/breadcrumb';
import ProductListing from '@/components/shared/ui/product-listing';
import ProductListingWithCart from '@/components/shared/ui/product-listing/with-cart';
import { productsData } from '@/temp/data/products-data';
import { Fragment } from 'react';

interface ProductPageProps {
  params: Promise<{ locale: string; category: string; product: string }>;
}

// Mock product data - Replace with actual data fetching
const getProductData = (productSlug: string): ProductDetailData => {
  // This is sample data matching the image description
  // In a real app, you would fetch this from an API or database
  return {
    id: productSlug,
    name: 'Royal Wooden Sofa',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
    ],
    price: 799,
    originalPrice: 899,
    discount: 25,
    rating: 4.2,
    reviewCount: 58,
    views24h: 156,
    stockCount: 10,
    stockLeft: 2,
    colors: [
      { id: 'beige', name: 'Beige', value: '#f5f5dc' },
      { id: 'teal', name: 'Teal', value: '#4a9b8e' },
      { id: 'lavender', name: 'Lavender', value: '#b8a9c9' },
      { id: 'maroon', name: 'Maroon', value: '#800020' },
    ],
    sizes: [
      { id: '1-seater', label: '1 Seater' },
      {
        id: '2-seater',
        label: '2 Seater',
        dimensions: 'W: 160cm, D: 90cm, H: 85cm',
      },
      { id: '3-seater', label: '3 Seater' },
    ],
    deliveryDate: 'Fri, 28 Feb 2025',
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product } = await params;
  const productData = getProductData(product);

  return (
    <Fragment>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: category, href: `/${category}` },
          { label: productData.name },
        ]}
      />
      <ProductDetail data={productData} />
      <div className="py-6 mt-8 space-y-4">
        <ProductListingWithCart
          title="Frequently Bought Together"
          seeAllHref="/products"
          products={productsData}
        />

        <ProductListing
          title="Similar Products"
          seeAllHref="/products"
          products={productsData}
        />
      </div>
    </Fragment>
  );
}
