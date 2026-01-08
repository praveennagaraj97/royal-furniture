import { API_ROUTES } from '@/constants/api-routes';
import type { CountryLanguageOptionsResponse } from '@/types';
import { BaseAPIService } from './api-base-service';

export class ConfigService extends BaseAPIService {
  async getCountryLanguageOptions(): Promise<CountryLanguageOptionsResponse> {
    try {
      const response = await this.http.get<CountryLanguageOptionsResponse>(
        API_ROUTES.CONFIG.COUNTRY_LANGUAGE_OPTIONS
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const configService = new ConfigService();
