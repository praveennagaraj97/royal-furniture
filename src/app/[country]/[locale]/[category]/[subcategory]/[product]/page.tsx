import { ProductDetail } from '@/components/product';
import { UserReviews } from '@/components/product/user-reviews';
import ProductListing from '@/components/shared/ui/product-listing';
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
      {(productData.frequently_bought_together.length > 0 ||
        productData.similar_products.length > 0 ||
        productData.you_may_also_like.length > 0) && (
        <div className="py-6 space-y-6">
          {productData.frequently_bought_together.length > 0 && (
            <ProductListing
              title="Complete the Collection"
              products={productData.frequently_bought_together || []}
            />
          )}

          {/* Reviews Section */}
          <div className="section-container">
            <UserReviews />
            {/* <hr className="mt-6 opacity-10" /> */}
          </div>

          {productData.similar_products.length > 0 && (
            <ProductListing
              title="Similar Products"
              products={productData.similar_products || []}
            />
          )}

          {productData.you_may_also_like.length > 0 && (
            <ProductListing
              title="You May Also Like"
              products={productData.you_may_also_like || []}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
