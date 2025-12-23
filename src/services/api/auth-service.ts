import { API_ROUTES } from '@/constants/api-routes';
import type { RegisterPayload, VerifyOTPPayload } from '@/types/payload';
import type {
  BaseAPIResponse,
  RegisterResponse,
  VerifyOTPResponse,
} from '@/types/response';
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

  async resendVerifyPhone(
    phoneNumber: string
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.RESEND_VERIFY_PHONE,
        {
          phone_number: phoneNumber,
        }
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const authService = new AuthService();
