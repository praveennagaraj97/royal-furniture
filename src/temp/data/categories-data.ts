import { Subcategory } from '@/components/layout/categories/category-card';

export interface CategoriesData {
  [key: string]: Subcategory[];
}

export const categoriesData: CategoriesData = {
  sofa: [
    {
      id: 'sectional-1',
      name: 'Sectional',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      imageAlt: 'Sectional sofa',
    },
    {
      id: 'lounge',
      name: 'Lounge',
      image:
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
      imageAlt: 'Lounge sofa',
    },
    {
      id: 'recliners',
      name: 'Recliners',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      imageAlt: 'Recliner sofa',
    },
    {
      id: 'tuxedo-sofa',
      name: 'Tuxedo Sofa',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      imageAlt: 'Tuxedo sofa',
    },
    {
      id: 'sectional-2',
      name: 'Sectional',
      image:
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
      imageAlt: 'Sectional sofa',
    },
  ],
  'living-room': [
    {
      id: 'tv-stand',
      name: 'TV Stand',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      imageAlt: 'TV Stand',
    },
    {
      id: 'coffee-table',
      name: 'Coffee Table',
      image:
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300&h=300&fit=crop',
      imageAlt: 'Coffee Table',
    },
    {
      id: 'bookshelf',
      name: 'Bookshelf',
      image:
        'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=300&h=300&fit=crop',
      imageAlt: 'Bookshelf',
    },
  ],
  'dining-room': [
    {
      id: 'dining-table',
      name: 'Dining Table',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      imageAlt: 'Dining Table',
    },
    {
      id: 'dining-chairs',
      name: 'Dining Chairs',
      image:
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300&h=300&fit=crop',
      imageAlt: 'Dining Chairs',
    },
  ],
  bedroom: [
    {
      id: 'bed-frame',
      name: 'Bed Frame',
      image:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop',
      imageAlt: 'Bed Frame',
    },
    {
      id: 'wardrobe',
      name: 'Wardrobe',
      image:
        'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=300&h=300&fit=crop',
      imageAlt: 'Wardrobe',
    },
  ],
  office: [
    {
      id: 'desk',
      name: 'Desk',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop',
      imageAlt: 'Office Desk',
    },
    {
      id: 'office-chair',
      name: 'Office Chair',
      image:
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop',
      imageAlt: 'Office Chair',
    },
  ],
};
