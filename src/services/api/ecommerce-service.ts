import { API_ROUTES } from '@/constants/api-routes';
import type { HomePageResponse } from '@/types/response';
import { BaseAPIService } from './api-base-service';

export class EcommerceService extends BaseAPIService {
  async getHomePageData(countryId: number): Promise<HomePageResponse> {
    try {
      const response = await this.http.get<HomePageResponse>(
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
}

export const ecommerceService = new EcommerceService();
