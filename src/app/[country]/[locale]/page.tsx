import Hero from '@/components/home/hero';
import PromotionalOffers from '@/components/home/promotional-offers';
import CountdownTag from '@/components/shared/ui/countdown-tag';
import ProductListing from '@/components/shared/ui/product-listing';
import ProductListingWithCart from '@/components/shared/ui/product-listing/with-cart';
import { ecommerceService } from '@/services/api/ecommerce-service';
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
        <ProductListing
          title="Trending Products"
          seeAllHref="/products?type=trending"
          products={data.trending_products.items || []}
        />
      )}

      {/* <MegaPriceDropBanner /> */}

      {/* Include Video */}
      {/* {data.sofa_and_seating && (
        }
      <SofaAndSeating />
      <HomeFurnitureShowcase />
      */}

      {/* TODO : COUNTDOWN */}
      <ProductListing
        title={
          <div className="flex gap-1.5 flex-wrap">
            <span className="lg:text-2xl md:text-xl text-lg text-indigo-slate">
              Deal of the day
            </span>
            <CountdownTag hours={12} minutes={30} seconds={0} />
          </div>
        }
        products={data.featured_deals.items || []}
      />

      <ProductListingWithCart
        title="Deal of the day"
        seeAllHref="/products?type=deal_of_the_day"
        products={data.featured_deals.items || []}
      />

      {
        // TODO : personalise_banners
        /* <PromotionalBanner />
      <FurnitureShowcase /> */
      }

      {
        // TODO
        /* <HouseHolds /> */
      }

      {/* 
     TODO : WIRE TO offers_spotlight
      <PromotionalBanner />
      <FurnitureShowcase /> */}

      <ProductListing
        title="New Arrivals"
        seeAllHref="/product?type=new_arrivals"
        products={data.new_launches.items || []}
      />

      {/* <PromotionalBanner /> */}
      {/* 
      <LatestBlogs /> */}
    </div>
  );
};

export default Home;

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
