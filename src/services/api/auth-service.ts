import { API_ROUTES } from '@/constants/api-routes';
import type {
  EmailLoginPayload,
  ForgotPasswordEmailPayload,
  ForgotPasswordResendOTPPayload,
  ForgotPasswordResetPasswordSMSPayload,
  ForgotPasswordSendOTPPayload,
  ForgotPasswordVerifyOTPPayload,
  LoginWithPasswordPayload,
  PhoneLoginPayload,
  RegisterPayload,
  ResendOTPPayload,
  VerifyOTPLoginPayload,
  VerifyOTPPayload,
} from '@/types/payload';
import type {
  BaseAPIResponse,
  ForgotPasswordVerifyOTPResponse,
  LoginWithPasswordResponse,
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

  async loginWithPassword(
    payload: LoginWithPasswordPayload
  ): Promise<LoginWithPasswordResponse> {
    try {
      const response = await this.http.post<LoginWithPasswordResponse>(
        API_ROUTES.AUTH.LOGIN_WITH_PASSWORD,
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

  async emailLogin(
    payload: EmailLoginPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.EMAIL_LOGIN,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async phoneLogin(
    payload: PhoneLoginPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.PHONE_LOGIN,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async verifyOTPLogin(
    payload: VerifyOTPLoginPayload
  ): Promise<VerifyOTPResponse> {
    try {
      const response = await this.http.post<VerifyOTPResponse>(
        API_ROUTES.AUTH.VERIFY_OTP_LOGIN,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async resendOTP(
    payload: ResendOTPPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.RESEND_OTP,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async forgotPasswordEmail(
    payload: ForgotPasswordEmailPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.FORGOT_PASSWORD_EMAIL,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async forgotPasswordSendOTP(
    payload: ForgotPasswordSendOTPPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.FORGOT_PASSWORD_SEND_OTP,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async forgotPasswordVerifyOTP(
    payload: ForgotPasswordVerifyOTPPayload
  ): Promise<ForgotPasswordVerifyOTPResponse> {
    try {
      const response = await this.http.post<ForgotPasswordVerifyOTPResponse>(
        API_ROUTES.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async forgotPasswordResendOTP(
    payload: ForgotPasswordResendOTPPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.FORGOT_PASSWORD_RESEND_OTP,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  async forgotPasswordResetPasswordSMS(
    payload: ForgotPasswordResetPasswordSMSPayload
  ): Promise<BaseAPIResponse<unknown>> {
    try {
      const response = await this.http.post<BaseAPIResponse<unknown>>(
        API_ROUTES.AUTH.FORGOT_PASSWORD_RESET_PASSWORD_SMS,
        payload
      );
      return response.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }
}

export const authService = new AuthService();
