import CountdownTag from '@/components/shared/ui/countdown-tag';
import FadeSlideshow from '@/components/shared/ui/fade-slideshow';
import FullWidthBanner from '@/components/shared/ui/fullwidth-banner';
import Hero from '@/components/shared/ui/hero';
import LatestBlogs from '@/components/shared/ui/latest-blogs';
import Offers from '@/components/shared/ui/offers';
import ProductListing from '@/components/shared/ui/product-listing';
import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import SubCategoriesSwiper from '@/components/shared/ui/subcategories';
import { ecommerceService } from '@/services/api/ecommerce-service';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string; country: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, country, locale } = await params;

  const { data } = await ecommerceService.getCategoryHomeData(category, {
    country,
    locale,
  });

  const renderBlocks = () => {
    return data.map(
      (
        {
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
        },
        idx
      ) => {
        switch (section_type) {
          case 'hero':
            if (banners) {
              if (layout_type === 'full_width_banner') {
                return (
                  <FullWidthBanner
                    banners={banners || []}
                    key={section_type + sort_order + idx}
                  />
                );
              }
              return (
                <Hero
                  banners={banners || []}
                  key={section_type + sort_order + idx}
                />
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
                  key={section_type + sort_order + idx}
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
                  key={section_type + sort_order + idx}
                />
              );
            }
            return null;

          // Subcategory Showcase
          case 'subcategory_showcase':
            if (subcategories && subcategories.length > 0) {
              return (
                <Fragment key={section_type + sort_order + idx}>
                  {title ? (
                    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
                      <SectionTitleTag
                        title={title}
                        className="text-xl font-semibold"
                      />
                    </div>
                  ) : null}
                  {layout_type === 'with_fullwidth_banner' ? (
                    <FullWidthBanner banners={banners || []} />
                  ) : null}
                  {layout_type === 'with_banner' ? (
                    <FadeSlideshow banners={banners || []} />
                  ) : null}
                  <SubCategoriesSwiper items={subcategories || []} />
                </Fragment>
              );
            }
            return null;

          case 'blog_slider':
            if (blogs && blogs.length > 0) {
              return (
                <LatestBlogs
                  blogs={blogs || []}
                  key={section_type + sort_order + idx}
                />
              );
            }
            return null;

          default:
            return (
              <p key={section_type + sort_order + idx}>
                {section_type + layout_type}
              </p>
            );
        }
      }
    );
  };

  if (!data.length) {
    return notFound();
  }

  return <div className="grid gap-6 mt-4">{renderBlocks()}</div>;
}
