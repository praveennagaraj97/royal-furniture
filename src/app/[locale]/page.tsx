import FurnitureCategories from '@/components/home/furniture-categories';
import Hero from '@/components/home/hero';
import ProductListing from '@/components/home/product-listing';
import PromotionalBanner from '@/components/home/promotional-banner';
import PromotionalOffers from '@/components/home/promotional-offers';
import { productsData } from '@/temp/data/products-data';

export default function Home() {
  return (
    <div className="grid gap-4">
      <Hero />
      <PromotionalOffers />
      <ProductListing
        title="Trending Products"
        seeAllHref="/products"
        products={productsData}
      />
      <PromotionalBanner />
      <FurnitureCategories />
      <PromotionalBanner />
    </div>
  );
}
