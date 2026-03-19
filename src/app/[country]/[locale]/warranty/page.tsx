import WarrantyPage from '@/components/legal-pages/warranty';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warranty | Royal Manor',
  description:
    'Review the Royal Manor warranty coverage, claim process, and exclusions.',
};

export default function Page() {
  return <WarrantyPage />;
}
