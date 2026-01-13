import { BaseAPIResponse, BlogItem, ProductItem, SubCategoryItem } from '.';

export type HomeSectionType =
  | 'hero'
  | 'top_offers'
  | 'products_section'
  | 'subcategory_showcase'
  | 'spotlight'
  | 'blog_slider';

export type HomeLayoutType =
  | 'hero_slider'
  | 'banner_grid_3'
  | 'horizontal_slider'
  | 'pattern_1'
  | 'pattern_2'
  | 'pattern_3'
  | 'pattern_4'
  | 'pattern_5'
  | 'full_width_card';

export type ViewAllType =
  | 'trending'
  | 'deals'
  | 'new_arrival'
  | 'saved_items'
  | 'personalized';

export interface HomeBanner {
  id: number;
  slug: string;
  offer_text: string | null;
  media_type: 'image' | 'video';
  image: string | null;
  video: string | null;
  link_url: string;
}

export interface HomeSection {
  title: string;
  section_type: HomeSectionType;
  layout_type: HomeLayoutType;
  sort_order: number;
  // Optional fields based on section_type
  banners?: HomeBanner[];
  products?: ProductItem[];
  subcategories?: SubCategoryItem[];
  blogs?: BlogItem[];
  view_all_type?: ViewAllType;
  deal_ends_at?: string; // ISO Date string for countdowns
}

/**
 * Updated Home Page Response Type
 */
export type DynamicHomeResponse = BaseAPIResponse<HomeSection[]>;
