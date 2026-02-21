import { API_ROUTES } from '@/constants/api-routes';
import type {
  AddressPayload,
  AddressResponse,
  AddressesListResponse,
} from '@/types/address';
import { BaseAPIService } from './api-base-service';

export class AddressService extends BaseAPIService {
  async getAddresses(): Promise<AddressesListResponse> {
    try {
      const response = await this.http.get<AddressesListResponse>(
        API_ROUTES.ADDRESSES.ROOT,
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async createAddress(payload: AddressPayload): Promise<AddressResponse> {
    try {
      const response = await this.http.post<AddressResponse>(
        API_ROUTES.ADDRESSES.ROOT,
        payload,
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async updateAddress(
    id: number | string,
    payload: AddressPayload,
  ): Promise<AddressResponse> {
    try {
      const response = await this.http.patch<AddressResponse>(
        API_ROUTES.ADDRESSES.DETAIL(id),
        payload,
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async deleteAddress(id: number | string): Promise<void> {
    try {
      await this.http.delete(API_ROUTES.ADDRESSES.DETAIL(id));
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async setDefaultAddress(id: number | string): Promise<void> {
    try {
      // POST to the set_default endpoint for the given address
      await this.http.post(`${API_ROUTES.ADDRESSES.DETAIL(id)}set_default/`);
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const addressService = new AddressService();

export default addressService;
