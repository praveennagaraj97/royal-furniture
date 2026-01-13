import HomeFurnitureShowcase from '@/components/home/furniture-showcase';
import Hero from '@/components/home/hero';
import LatestBlogs from '@/components/home/latest-blogs';
import PromotionalOffers from '@/components/home/promotional-offers';
import SofaAndSeating from '@/components/home/sofa-and-seating';
import CountdownTag from '@/components/shared/ui/countdown-tag';
import ProductListing from '@/components/shared/ui/product-listing';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { CountryAndLocaleParams } from '@/types';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import { NextPage } from 'next';
import { Fragment } from 'react';

export const dynamicParams = false;

const Home: NextPage<CountryAndLocaleParams> = async ({ params }) => {
  const { country, locale } = await params;

  const { data } = await ecommerceService.getHomePageData({ country, locale });

  const renderBlocks = () => {
    return data.map(
      ({
        section_type,
        banners,
        sort_order,
        title,
        products,
        blogs,
        deal_ends_at,
        subcategories,
        view_all_type,
      }) => {
        switch (section_type) {
          case 'hero':
            if (banners) {
              return (
                <Hero banners={banners || []} key={section_type + sort_order} />
              );
            }
            return null;

          case 'top_offers':
            if (banners) {
              return (
                <PromotionalOffers
                  offers={banners || []}
                  key={section_type + sort_order}
                />
              );
            }
            return null;

          case 'products_section':
            if (products && products.length > 0) {
              return (
                <ProductListing
                  title={
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="lg:text-2xl md:text-xl text-lg text-indigo-slate">
                        {title}
                      </span>
                      {deal_ends_at ? (
                        <CountdownTag dateString={deal_ends_at} />
                      ) : null}
                    </div>
                  }
                  products={products}
                  seeAllHref={
                    view_all_type
                      ? `/products?type=${view_all_type}`
                      : undefined
                  }
                  key={section_type + sort_order}
                />
              );
            }
            return null;

          case 'subcategory_showcase':
            return (
              <Fragment key={section_type + sort_order}>
                {banners ? (
                  <SofaAndSeating title={title || ''} banners={banners || []} />
                ) : null}
                <HomeFurnitureShowcase
                  items={
                    subcategories?.map((subcategory) => ({
                      id: subcategory.id.toString(),
                      image: subcategory.image || '',
                      imageAlt: subcategory.name || '',
                      label: subcategory.name || '',
                    })) || []
                  }
                />
              </Fragment>
            );

          case 'spotlight':
            if (banners && banners.length > 0) {
              return (
                <PromotionalOffers
                  offers={banners}
                  key={section_type + sort_order}
                />
              );
            }
            return null;

          case 'blog_slider':
            if (blogs && blogs.length > 0) {
              return (
                <LatestBlogs blogs={blogs} key={section_type + sort_order} />
              );
            }
            return null;
          default:
            return <p key={section_type + sort_order}>{section_type}</p>;
        }
      }
    );
  };

  return (
    <div className="grid gap-6 mt-4">
      {renderBlocks()}
      {/* Dynamic Sections */}

      {/* {data.promotional_banners && (
        <Hero banners={data.promotional_banners || []} />
      )}
      <PromotionalOffers offers={data.offer_banners || []} />
      {data.trending_products && (
        <ProductListing
          title="Trending Products"
          seeAllHref="/products?type=trending"
          products={data.trending_products.items || []}
        />
      )} */}

      {/* <MegaPriceDropBanner /> */}

      {/* Include Video */}
      {/* {data.sofa_and_seating && (
        }
      
      */}

      {/* TODO : COUNTDOWN */}
      {/* <ProductListing
        title={
          
        }
        products={data.featured_deals.items || []}
      />

      <ProductListing
        title="Deal of the day"
        seeAllHref="/products?type=deal_of_the_day"
        products={data.featured_deals.items || []}
      /> */}

      {
        // TODO : personalise_banners
        /*
         */
      }
      {/* <PromotionalBanner />
      <HomeFurnitureShowcase /> */}

      {
        // TODO
        /* <HouseHolds /> */
      }

      {/* 
     TODO : WIRE TO offers_spotlight
      <PromotionalBanner />
      <FurnitureShowcase /> */}

      {/* <ProductListing
        title="New Arrivals"
        seeAllHref="/product?type=new_arrivals"
        products={data.new_launches.items || []}
      /> */}

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
