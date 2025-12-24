import FurnitureCategories from '@/components/home/furniture-categories';
import Hero from '@/components/home/hero';
import MegaPriceDropBanner from '@/components/home/mega-price-drop-banner';
import PromotionalBanner from '@/components/home/promotional-banner';
import PromotionalOffers from '@/components/home/promotional-offers';
import ProductListing from '@/components/shared/ui/product-listing';
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
      <MegaPriceDropBanner />
      <PromotionalBanner />
      <FurnitureCategories />
      <PromotionalBanner />
    </div>
  );
}
