import { API_ROUTES } from '@/constants/api-routes';
import type { RegisterPayload, VerifyOTPPayload } from '@/types/payload';
import type { RegisterResponse, VerifyOTPResponse } from '@/types/response';
import { BaseAPIService } from './api-base-service';

export class AuthService extends BaseAPIService {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const response = await this.http.post<RegisterResponse>(
        API_ROUTES.AUTH.REGISTER,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async verifyOTP(payload: VerifyOTPPayload): Promise<VerifyOTPResponse> {
    try {
      const response = await this.http.post<VerifyOTPResponse>(
        API_ROUTES.AUTH.VERIFY_OTP,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const authService = new AuthService();
