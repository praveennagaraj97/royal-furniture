export interface Product {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
}

export const productsData: Product[] = [
  {
    id: 'premium-sofa-1',
    name: 'Premium Sofa Set',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    imageAlt: 'Premium Sofa Set - Light grey tufted two-seater',
    price: 799,
    originalPrice: 1065,
    discount: 25,
  },
  {
    id: 'premium-sofa-2',
    name: 'Premium Sofa Set',
    image:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop',
    imageAlt: 'Premium Sofa Set - Cream colored curved sectional',
    price: 799,
    originalPrice: 1065,
    discount: 25,
  },
  {
    id: 'premium-sofa-3',
    name: 'Premium Sofa Set',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    imageAlt: 'Premium Sofa Set - Light grey tufted two-seater',
    price: 799,
    originalPrice: 1065,
    discount: 25,
  },
  {
    id: 'premium-sofa-4',
    name: 'Premium Sofa Set',
    image:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop',
    imageAlt: 'Premium Sofa Set - Cream colored curved sectional',
    price: 799,
    originalPrice: 1065,
    discount: 25,
  },
  {
    id: 'luxury-sofa-1',
    name: 'Luxury Sofa Set',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop',
    imageAlt: 'Luxury Sofa Set',
    price: 1299,
    originalPrice: 1732,
    discount: 25,
  },
  {
    id: 'modern-sofa-1',
    name: 'Modern Sofa Set',
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=500&fit=crop',
    imageAlt: 'Modern Sofa Set',
    price: 999,
    originalPrice: 1332,
    discount: 25,
  },
];
