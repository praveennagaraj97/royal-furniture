import Hero, { FullWidthBanner } from '@/components/home/hero';
import LatestBlogs from '@/components/home/latest-blogs';
import Offers from '@/components/home/offers';
import CountdownTag from '@/components/shared/ui/countdown-tag';
import ProductListing from '@/components/shared/ui/product-listing';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { CountryAndLocaleParams } from '@/types';
import { getCountriesWithLocaleParams } from '@/utils/generated';
import { NextPage } from 'next';

export const dynamicParams = false;

// hero - hero_slider | full_width_card
// top_offers - banner_grid_3
// products_section - horizontal_slider
// subcategory_showcase - with_full_width_banner, without_banner, with_banner (NOTE: if title exits we will show, else it will be hidden)

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
        layout_type,
      }) => {
        switch (section_type) {
          case 'hero':
            if (banners) {
              if (layout_type === 'full_width_card') {
                return (
                  <FullWidthBanner
                    banners={banners || []}
                    key={section_type + sort_order}
                  />
                );
              }
              return (
                <Hero banners={banners || []} key={section_type + sort_order} />
              );
            }
            return null;

          case 'top_offers':
            if (banners) {
              return (
                <Offers
                  gridNumber={
                    layout_type === 'banner_grid_3'
                      ? parseInt(layout_type.split('_')[1])
                      : 0
                  }
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

          // case 'subcategory_showcase':
          //   if (subcategories && subcategories.length > 0) {
          //     switch (layout_type) {
          //       default:
          //         return null;
          //     }
          //   }

          case 'blog_slider':
            if (blogs && blogs.length > 0) {
              return (
                <LatestBlogs blogs={blogs} key={section_type + sort_order} />
              );
            }
            return null;
          default:
            return (
              <p key={section_type + sort_order}>{section_type + '- TODO'}</p>
            );
        }
      }
    );
  };

  return <div className="grid gap-6 mt-4">{renderBlocks()}</div>;
};

export default Home;

export function generateStaticParams() {
  return getCountriesWithLocaleParams();
}
