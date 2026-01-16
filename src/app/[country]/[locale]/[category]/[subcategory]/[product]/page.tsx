import { ProductDetail } from '@/components/product';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
    locale: string;
    country: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, country, locale } = await params;

  const response = await ecommerceService.getProductDetail(product, {
    country,
    locale,
  });

  if (!response.data) {
    notFound();
  }

  const productData = response.data;

  return (
    <Fragment>
      <ProductDetail data={productData} />
      {/* <div className="py-6 mt-8 space-y-4">
        <ProductListing
          title="Frequently Bought Together"
          seeAllHref="/products"
          products={response.data.frequently_bought_together || []}
        />

        <ProductListing
          title="Similar Products"
          seeAllHref="/products"
          products={response.data.similar_products || []}
        />
      </div> */}
    </Fragment>
  );
}

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
