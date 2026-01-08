import { API_ROUTES } from '@/constants/api-routes';
import type { HomeApiResponse, ProductDetailResponse } from '@/types';
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
}

export const ecommerceService = new EcommerceService();
