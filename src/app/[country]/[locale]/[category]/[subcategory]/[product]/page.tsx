import { ProductDetail } from '@/components/product';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;

  const response = await ecommerceService.getProductDetail(product);

  if (!response.data) {
    notFound();
  }

  const productData = response.data;

  return (
    <Fragment>
      <ProductDetail data={productData} />
      <div className="py-6 mt-8 space-y-4">
        {/* <ProductListingWithCart
          title="Frequently Bought Together"
          seeAllHref="/products"
          products={productsData}
        /> */}

        {/* <ProductListing
          title="Similar Products"
          seeAllHref="/products"
          products={productsData}
        /> */}
      </div>
    </Fragment>
  );
}

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
