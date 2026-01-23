import { SortOption } from '@/components/shared/sort-dropdown';

export const SORT_OPTIONS: SortOption[] = [
  { id: 'relevant', label: 'Relevant Products' },
  { id: 'best_seller', label: 'Best Seller' },
  { id: 'new_arrival', label: 'New Arrival' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'discount', label: 'Discount' },
];
