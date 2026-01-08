export interface BaseAPIResponse<T = unknown> {
  detail: string;
  message: string;
  data: T;
}

export interface RegisterResponseData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string;
  allow_notification: boolean;
}

export type RegisterResponse = BaseAPIResponse<RegisterResponseData>;

export interface VerifyOTPTokenSet {
  refresh: string;
  access: string;
}

export interface VerifyOTPResponseData {
  user_id: string;
  email: string;
  phone_number: string;
  status: string;
  tokens: VerifyOTPTokenSet;
}

export type VerifyOTPResponse = BaseAPIResponse<VerifyOTPResponseData>;

export interface LoginWithPasswordResponseData {
  user_id: string;
  email: string;
  tokens: VerifyOTPTokenSet;
}

export type LoginWithPasswordResponse =
  BaseAPIResponse<LoginWithPasswordResponseData>;

export interface ForgotPasswordVerifyOTPResponseData {
  reset_token: string;
}

export type ForgotPasswordVerifyOTPResponse =
  BaseAPIResponse<ForgotPasswordVerifyOTPResponseData>;

export interface RefreshTokenResponseData {
  access: string;
  refresh: string;
}

export type RefreshTokenResponse = BaseAPIResponse<RefreshTokenResponseData>;

export interface User {
  id: number;
  uid: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  allow_notification: boolean;
  status: string;
  profile_image_url: string | null;
}

export type UserProfileResponse = BaseAPIResponse<User>;

export interface CountryLanguage {
  id: number;
  country_name: string;
  country_code: string;
  language: string;
  language_code: string;
  currency: string;
  image: string;
  is_default: boolean;
}

export type CountryLanguageOptionsResponse = BaseAPIResponse<CountryLanguage[]>;

export interface HomePageData {
  top_bar: TopBar;
  active_sale: ActiveSale;
  promotional_banners: BannerItem[];
  offer_banners: BannerItem[];
  sofas_and_seating: CategorySection;
  bedroom: CategorySection;
  diningroom: CategorySection;
  offers_spotlight: OfferSpotlight;
  trending_products: ProductCarousel;
  saved_products: ProductCarousel;
  personalized_for_you: PersonalizedSection;
  featured_deals: ProductCarousel;
  new_launches: ProductCarousel;
  shop_by_category: CategoryItem[];
  room_offers: BannerItem[];
  find_stores: StoreLocator;
  social_media: SocialMediaLinks;
  floating_offers: FloatingOffer;
  latest_blog: BlogItem[];
}

export interface TopBar {
  search_placeholder: string;
  categories: string[];
  notification_count: number;
  location: LocationInfo;
}

export interface LocationInfo {
  current: string;
  can_update: boolean;
}

export interface ActiveSale {
  is_active: boolean;
}

export interface FloatingOffer {
  visible: boolean;
  badge_count: number;
  label: string;
  link_url: string;
}

export interface BannerItem {
  id: number;
  title: string;
  description: string;
  type: 'section' | 'category' | 'subcategory' | 'offer_card' | 'room';
  image: string | null;
  video: string | null;
  link_url: string | null;
  start_time: string | null;
  end_time: string | null;
  show_countdown: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface SubCategoryItem {
  id: number;
  name: string;
  slug: string | null;
  category_name: string;
  category_id: number;
}

export interface CategorySection {
  id: number;
  slug: string;
  title: string;
  banner: BannerItem | null;
  subcategories: SubCategoryItem[];
  video_banner: BannerItem | null;
}

export interface OfferSpotlight {
  title: string;
  description: string;
  section_type: 'subcategory';
  main_banner: BannerItem;
  subcategories: SubCategoryItem[];
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  sub_category: SubCategoryItem;
  pricing: ProductPricing;
  thumbnail_image: string;
  label: ProductLabel[];
  is_offer: boolean;
  average_rating: number;
  is_in_wishlist: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductPricing {
  base_price: string | null;
  offer_price: string | null;
  offer_percentage: string | null;
  tax: string | null;
}

export interface ProductLabel {
  id: number;
  name: string;
  slug: string;
}

export interface ProductCarousel {
  auto_scroll_seconds: number | null;
  items: ProductItem[] | null;
}

export interface PersonalizedSection {
  available: boolean;
  items: ProductItem[];
}

export interface StoreLocator {
  map_url: string;
  list: StoreItem[];
}

export interface StoreLocator {
  map_url: string;
  list: StoreItem[];
}

export interface StoreItem {
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

export interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  author: string | null;
  category: BlogCategory;
  thumbnail: string;
  short_description: string;
  published_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export type HomeApiResponse = BaseAPIResponse<HomePageData>;
