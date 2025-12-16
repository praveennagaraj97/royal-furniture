import Hero from '@/components/home/hero';
import PromotionalOffers from '@/components/home/promotional-offers';

export default function Home() {
  return (
    <div className="grid gap-6">
      <Hero />
      <PromotionalOffers />

      <div className="h-96"></div>
    </div>
  );
}
