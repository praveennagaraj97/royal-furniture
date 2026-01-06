import FurnitureShowcase from '@/components/home/furniture-showcase';
import Hero from '@/components/home/hero';
import HouseHolds from '@/components/home/households';
import LatestBlogs from '@/components/home/latest-blogs';
import MegaPriceDropBanner from '@/components/home/mega-price-drop-banner';
import PromotionalBanner from '@/components/home/promotional-banner';
import PromotionalOffers from '@/components/home/promotional-offers';
import SofaAndSeating from '@/components/home/sofa-and-seating';
import CountdownTag from '@/components/shared/ui/countdown-tag';
import ProductListing from '@/components/shared/ui/product-listing';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { productsData } from '@/temp/data/products-data';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import { NextPage } from 'next';

export const dynamicParams = false;

const Home: NextPage = async () => {
  const { data } = await ecommerceService.getHomePageData(1);

  return (
    <div className="grid gap-6 mt-4">
      {data.promotional_banners && (
        <Hero banners={data.promotional_banners || []} />
      )}
      <PromotionalOffers offers={data.offer_banners || []} />
      {data.trending_products && (
        <ProductListing title="Trending Products" products={productsData} />
      )}
      <MegaPriceDropBanner />
      <SofaAndSeating />
      <FurnitureShowcase />

      <ProductListing
        title={
          <div className="flex gap-1.5 flex-wrap">
            <span className="lg:text-2xl md:text-xl text-lg text-indigo-slate">
              Deal of the day
            </span>
            <CountdownTag hours={12} minutes={30} seconds={0} />
          </div>
        }
        products={productsData}
      />

      <PromotionalBanner />

      <FurnitureShowcase />

      <HouseHolds />
      <PromotionalBanner />
      <FurnitureShowcase />
      <ProductListing title="New Arrivals" products={productsData} />

      <PromotionalBanner />
      <LatestBlogs />
    </div>
  );
};

export default Home;

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
