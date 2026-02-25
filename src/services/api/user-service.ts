import { API_ROUTES } from '@/constants/api-routes';
import type { BaseAPIResponse } from '@/types';
import { BaseAPIService } from './api-base-service';

export interface UpdateUserLocationPayload {
  latitude: number;
  longitude: number;
}

export class UserService extends BaseAPIService {
  async updateLocation(
    payload: UpdateUserLocationPayload,
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.USERS.LOCATION,
        payload,
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const userService = new UserService();

export default userService;
