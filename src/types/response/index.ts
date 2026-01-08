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

export interface ProductDetailPricing extends ProductPricing {
  amount_saved: string;
}

export interface FabricColorInfo {
  id: number;
  fabric_name: string;
  fabric_image: string;
  color_name: string;
  color_hex: string;
  fabric_color_image: string | null;
}

export interface StockStatus {
  stock_count: number;
  status: 'in_stock' | 'out_of_stock';
  message: string;
}

export interface CartStatus {
  in_cart: boolean;
  quantity: number;
}

// Detail-specific information section
export interface InfoItem {
  label: string;
  value: string;
  display_order: number;
}

export interface ProductInfoSection {
  material?: InfoItem[];
  specs?: InfoItem[];
  dimensions?: InfoItem[];
  warranty?: InfoItem[];
  assembly?: InfoItem[];
}

export interface ProductVariantColor {
  id: number;
  sku: string;
  name: string;
  hex: string;
  variant_id: number;
  images: string[];
  stock: number;
  is_wishlist: boolean;
  region_prices: ProductPricing;
  fabric_color_info: FabricColorInfo;
  stock_status: StockStatus;
  cart_status: CartStatus;
  info_section: ProductInfoSection;
}

export interface ProductFabric {
  name: string;
  image: string;
  colorsList: ProductVariantColor[];
}

export interface ProductVariant {
  name: string;
  fabricsList: ProductFabric[];
}

/**
 * Main Product Detail Data Structure
 */
export interface ProductDetailData {
  header: {
    wishlist_icon: boolean;
    share_icon: boolean;
    product_slug: string;
  };
  product_info: Omit<
    ProductItem,
    'description' | 'is_offer' | 'average_rating' | 'is_in_wishlist' | 'pricing'
  > & {
    pricing: ProductDetailPricing;
    view_count: number;
    is_customizable: boolean;
    delivery_estimate_days: string;
  };
  variants: ProductVariant[];
  delivery_info: {
    location: string;
    estimated_delivery: string;
    supports_express_delivery: boolean;
    express_delivery_duration: string | null;
    express_delivery_charge: string | null;
    supports_free_assembly: boolean;
  };
  flexi_payment: {
    available: boolean;
    upfront_percentage: number;
    description: string;
    modal_content: {
      title: string;
      description: string;
      benefits: string[];
    };
  };
  try_in_store: {
    available: boolean;
    message: string;
    stores: unknown[]; // Based on API JSON
  };
  customization_options: {
    is_customizable: boolean;
    message: string;
  };
  general_information: string;
  reviews_summary: {
    average_rating: number;
    total_reviews: number;
    rating_breakdown: Record<string, number>;
  };
  frequently_bought_together: unknown[];
  payment_options: {
    methods: string[];
    flexi_payment_available: boolean;
    flexi_payment_percentage: number;
  };
  free_assembly: {
    is_assemble: boolean;
    description: string;
  };
  express_delivery_timer: {
    available: boolean;
  };
  browse_more: {
    category: Pick<ProductCategory, 'id' | 'name'>;
    sub_category: Pick<SubCategoryItem, 'id' | 'name'>[];
  };
  similar_products: Array<
    Pick<ProductItem, 'id' | 'name' | 'slug' | 'pricing'> & {
      thumbnail: string;
      label: string[];
      sku: string;
    }
  >;
  you_may_also_like: unknown[];
}

export type ProductDetailResponse = BaseAPIResponse<ProductDetailData>;
