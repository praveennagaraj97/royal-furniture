import { API_ROUTES } from '@/constants/api-routes';
import type {
  CategoriesResponse,
  CategoryWithSubCategories,
  HomeApiResponse,
  ProductDetailResponse,
  SubCategoriesResponse,
} from '@/types';
import { BaseAPIService } from './api-base-service';

export class EcommerceService extends BaseAPIService {
  async getHomePageData(countryId: number): Promise<HomeApiResponse> {
    try {
      const response = await this.http.get<HomeApiResponse>(
        API_ROUTES.PRODUCTS.HOME,
        {
          params: { country_id: countryId },
        }
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async getProductDetail(
    productSlug: string,
    options?: { locale?: string; country?: string }
  ): Promise<ProductDetailResponse> {
    try {
      const headers: Record<string, string> = {};
      if (options?.locale) {
        headers['locale'] = options.locale;
      }
      if (options?.country) {
        headers['country'] = options.country;
      }

      const response = await this.http.get<ProductDetailResponse>(
        `${API_ROUTES.PRODUCTS.DETAIL}${productSlug}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async getCategories(options?: {
    locale?: string;
    country?: string;
  }): Promise<CategoryWithSubCategories[]> {
    try {
      const headers: Record<string, string> = {};
      if (options?.locale) {
        headers['locale'] = options.locale;
      }
      if (options?.country) {
        headers['country'] = options.country;
      }

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
        } catch (error) {
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
