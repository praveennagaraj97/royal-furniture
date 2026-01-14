import { API_ROUTES } from '@/constants/api-routes';
import type {
  CategoriesResponse,
  CategoryWithSubCategories,
  CountryAndLocaleParam,
  ProductDetailResponse,
  SubCategoriesResponse,
} from '@/types';
import { DynamicHomeResponse } from '@/types/response/home';
import { BaseAPIService } from './api-base-service';

export class EcommerceService extends BaseAPIService {
  async getHomePageData(
    options: CountryAndLocaleParam
  ): Promise<DynamicHomeResponse> {
    try {
      const response = await this.http.get<DynamicHomeResponse>(
        API_ROUTES.PRODUCTS.HOME,
        {
          headers: this.getLocaleAndCountryHeader(
            options.locale,
            options.country
          ),
        }
      );
      return {
        data: response.data?.data?.filter((section) => !section.is_mobile_only),
        detail: response.data.detail,
        message: response.data.message,
      };
    } catch {
      return { data: [], detail: '', message: '' };
    }
  }

  async getProductDetail(
    productSlug: string,
    options?: CountryAndLocaleParam
  ): Promise<ProductDetailResponse> {
    try {
      const response = await this.http.get<ProductDetailResponse>(
        `${API_ROUTES.PRODUCTS.DETAIL}${productSlug}`,
        {
          headers: this.getLocaleAndCountryHeader(
            options?.locale,
            options?.country
          ),
        }
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async getCategories(
    locale?: string,
    country?: string
  ): Promise<CategoryWithSubCategories[]> {
    try {
      const headers = this.getLocaleAndCountryHeader(locale, country);

      const response = await this.http.get<CategoriesResponse>(
        API_ROUTES.PRODUCTS.CATEGORIES,
        {
          headers,
        }
      );

      const categories = response.data.data;

      // Fetch subcategories for each category
      const categoriesWithSubCategories: CategoryWithSubCategories[] = [];

      for (const category of categories) {
        try {
          const subCategoriesResponse =
            await this.http.get<SubCategoriesResponse>(
              API_ROUTES.PRODUCTS.CATEGORY_SUBCATEGORIES(category.slug),
              {
                headers,
              }
            );

          const subCategories = subCategoriesResponse.data.data;

          categoriesWithSubCategories.push({
            ...category,
            subCategories: subCategories.length > 0 ? subCategories : null,
          });
        } catch {
          // If subcategories fetch fails, set to null
          categoriesWithSubCategories.push({
            ...category,
            subCategories: null,
          });
        }
      }

      return categoriesWithSubCategories;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const ecommerceService = new EcommerceService();
