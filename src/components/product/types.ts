export interface ColorOption {
  id: string;
  name: string;
  value: string; // hex color or image URL
  isImage?: boolean;
}

export interface SizeOption {
  id: string;
  label: string;
  dimensions?: string;
}

export interface ProductDetailData {
  id: string;
  name: string;
  images: string[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  views24h?: number;
  stockCount?: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  stockLeft?: number;
  deliveryDate?: string;
}
