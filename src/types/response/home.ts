import {
  BaseAPIResponse,
  BlogItem,
  ProductItem,
  ResponsiveImages,
  SubCategoryItem,
} from '.';

export type HomeSectionType =
  | 'hero'
  | 'top_offers'
  | 'products_section'
  | 'subcategory_showcase'
  | 'blog_slider';

export type HomeLayoutType =
  | 'hero_slider'
  | 'banner_grid_3'
  | 'full_width_banner'
  | 'horizontal_slider'
  | 'with_fullwidth_banner'
  | 'without_banner'
  | 'with_banner';

export type ViewAllType =
  | 'trending'
  | 'deals'
  | 'new_arrival'
  | 'saved_items'
  | 'personalized';

export interface BannerItem {
  id: number;
  slug: string;
  offer_text: string | null;
  media_type: 'image' | 'video';
  image: string | null;
  video: string | null;
  link_url: string;
  responsive_images?: ResponsiveImages;
}

export interface HomeSection {
  title: string;
  section_type: HomeSectionType;
  layout_type: HomeLayoutType;
  sort_order: number;
  // Optional fields based on section_type
  banners?: BannerItem[];
  products?: ProductItem[];
  subcategories?: SubCategoryItem[];
  blogs?: BlogItem[];
  view_all_type?: ViewAllType;
  deal_ends_at?: string; // ISO Date string for countdowns

  is_mobile_only: boolean;
  is_web_only: boolean;
}

/**
 * Updated Home Page Response Type
 */
export type DynamicHomeResponse = BaseAPIResponse<HomeSection[]>;
