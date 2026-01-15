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

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  author: string | null;
  category: CategoryItem;
  thumbnail: string;
  short_description: string;
  published_at: string;
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
  image: string;
  category_name: string;
  category_id: number;
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

export interface FilterDataItem {
  id: number;
  label: string;
  key: string;
  filter_type: string;
}

export interface FilterViewItem {
  type: string;
  type_id: number;
  display_order: number;
  filter_data: FilterDataItem[];
}

export type FilterViewResponse = BaseAPIResponse<FilterViewItem[]>;

export interface CategoryWithSubCategories extends CategoryItem {
  subCategories: SubCategoryItem[] | null;
}

export type CategoriesResponse = BaseAPIResponse<CategoryItem[]>;
export type SubCategoriesResponse = BaseAPIResponse<SubCategoryItem[]>;

// Search API Types
export interface PopularSearch {
  id: number;
  search_term: string;
  display_order: number;
}

export interface TrendingCategory {
  id: number;
  name: string;
  icon: string;
  banner_image: string | null;
  product_count: number;
}

export interface SearchSuggestionsData {
  popular_searches: PopularSearch[];
  most_searched_products: {
    items: ProductItem[];
  };
  trending_categories: {
    items: TrendingCategory[];
  };
}

export type SearchSuggestionsResponse = BaseAPIResponse<SearchSuggestionsData>;

export interface SearchResultsData {
  results: ProductItem[];
  total_count: number;
  page: number;
  total_pages: number;
  query: string;
}

export type SearchResultsResponse = BaseAPIResponse<SearchResultsData>;
