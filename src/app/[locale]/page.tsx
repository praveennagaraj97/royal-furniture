import FurnitureCategories from '@/components/home/furniture-categories';
import Hero from '@/components/home/hero';
import PromotionalBanner from '@/components/home/promotional-banner';
import PromotionalOffers from '@/components/home/promotional-offers';

export default function Home() {
  return (
    <div className="grid gap-4">
      <Hero />
      <PromotionalOffers />
      <PromotionalBanner />
      <FurnitureCategories />
      <PromotionalBanner />
    </div>
  );
}
