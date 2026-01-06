export interface HomeLocation {
  current: string;
  can_update: boolean;
  country_id: number;
}

export interface HomeTopBar {
  search_placeholder: string;
  categories?: string[];
  notification_count: number;
  location: HomeLocation;
}

export interface HomeActiveSale {
  is_active: boolean;
}

export interface PromotionalBanner {
  id: number;
  title: string;
  description?: null;
  type: string;
  image: string;
  video?: null;
  link_url: string;
  start_time: string;
  end_time: string;
  show_countdown: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface OfferBanner {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
  video?: null;
  link_url?: null;
  start_time?: null;
  end_time?: null;
  show_countdown: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface HomeBanner {
  id: number;
  title: string;
  description?: null;
  type: string;
  image: string;
  video?: null;
  link_url?: null;
  start_time?: null;
  end_time?: null;
  show_countdown: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface SubCategory {
  id: number;
  name: string;
  icon: string;
  banner_image?: string | null;
  display_priority: number;
  product_count: number;
  category_name: string;
  category_id: number;
}

export interface HomeVideoBanner {
  id: number;
  title: string;
  description?: null;
  type: string;
  image?: null;
  video: string;
  link_url?: null;
  start_time?: null;
  end_time?: null;
  show_countdown: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface HomeSofasAndSeating {
  id: number;
  title: string;
  banner: HomeBanner;
  subcategories?: SubCategory[];
  video_banner: HomeVideoBanner;
}

export interface HomeBedroomOrDiningRoom {
  id: number;
  title: string;
  banner: HomeBanner;
  subcategories?: SubCategory[];
  video_banner?: null;
}

export interface HomeOffersSpotlight {
  title: string;
  description: string;
  section_type: string;
  main_banner: OfferBanner;
  subcategories?: SubCategory[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  banner_image?: null;
  display_priority: number;
  delivery_estimate_days?: null;
  default_delivery_days: number;
  supports_express_delivery: boolean;
  express_delivery_duration?: null;
  express_delivery_charge?: null;
  supports_free_assembly: boolean;
  product_count: number;
}

export interface HomeProductPricing {
  base_price: string;
  offer_price: string;
  offer_percentage: number;
}

export interface HomeProductLabel {
  name?: null;
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  sub_category: SubCategory;
  pricing: HomeProductPricing;
  thumbnail_image: string;
  label: HomeProductLabel;
  show_3d_view: boolean;
  three_d_model?: null;
  view_count: number;
  is_customizable: boolean;
  is_offer: boolean;
  delivery_estimate_days?: string | null;
  display_priority: number;
  added_to_cart_count: number;
  status: string;
  average_rating: number;
  review_count: number;
  is_trending: boolean;
  is_in_wishlist: boolean;
}

export interface HomeProductCollection {
  auto_scroll_seconds: number;
  items?: ProductItem[];
}

export interface HomeSavedProducts {
  auto_scroll_seconds?: null;
  items?: null;
}

export interface HomePersonalizedForYou {
  available: boolean;
  items?: null[];
}

export interface HomeNewLaunches {
  auto_scroll_seconds: number;
  items?: null[];
}

export interface HomeShopByCategory {
  id: number;
  name: string;
  icon?: string | null;
  banner_image?: null;
  display_priority: number;
  delivery_estimate_days?: null;
  default_delivery_days: number;
  supports_express_delivery: boolean;
  express_delivery_duration?: null;
  express_delivery_charge?: null;
  supports_free_assembly: boolean;
  product_count: number;
}

export interface HomeStoreLocation {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  country: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: number;
  longitude: number;
}

export interface HomeFindStores {
  map_url: string;
  list?: HomeStoreLocation[];
}

export interface HomeSocialMedia {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

export interface HomeFloatingOffers {
  visible: boolean;
  badge_count: number;
  label: string;
  link_url: string;
}

export interface HomeBlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface HomeLatestBlog {
  id: number;
  title: string;
  slug: string;
  author?: null;
  category: HomeBlogCategory;
  thumbnail: string;
  short_description: string;
  published_at: string;
}

export interface HomeData {
  top_bar: HomeTopBar;
  active_sale: HomeActiveSale;
  promotional_banners?: PromotionalBanner[];
  offer_banners?: OfferBanner[];
  sofas_and_seating: HomeSofasAndSeating;
  bedroom: HomeBedroomOrDiningRoom;
  diningroom: HomeBedroomOrDiningRoom;
  offers_spotlight: HomeOffersSpotlight;
  trending_products: HomeProductCollection;
  saved_products: HomeSavedProducts;
  personalized_for_you: HomePersonalizedForYou;
  featured_deals: HomeProductCollection;
  new_launches: HomeNewLaunches;
  shop_by_category?: HomeShopByCategory[];
  room_offers?: OfferBanner[];
  find_stores: HomeFindStores;
  social_media: HomeSocialMedia;
  floating_offers: HomeFloatingOffers;
  latest_blog?: HomeLatestBlog[];
}
