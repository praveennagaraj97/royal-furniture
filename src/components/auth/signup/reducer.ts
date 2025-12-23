export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SignupFormTouched {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  mobileNumber?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export interface SignupState {
  formData: SignupFormData;
  countryCode: string;
  latitude: string | null;
  longitude: string | null;
  errors: SignupFormErrors;
  touched: SignupFormTouched;
  isSubmitted: boolean;
  isLoading: boolean;
}

export type SignupAction =
  | { type: 'SET_FIELD_VALUE'; field: keyof SignupFormData; value: string }
  | { type: 'SET_COUNTRY_CODE'; value: string }
  | { type: 'SET_LOCATION'; latitude: string; longitude: string }
  | { type: 'CLEAR_LOCATION' }
  | { type: 'SET_FIELD_ERROR'; field: keyof SignupFormErrors; error?: string }
  | { type: 'CLEAR_FIELD_ERROR'; field: keyof SignupFormErrors }
  | { type: 'SET_TOUCHED'; field: keyof SignupFormTouched }
  | { type: 'SET_ALL_TOUCHED' }
  | { type: 'SET_IS_SUBMITTED'; value: boolean }
  | { type: 'SET_IS_LOADING'; value: boolean }
  | { type: 'SET_ERRORS'; errors: SignupFormErrors }
  | { type: 'RESET_FORM' };

export const initialState: SignupState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  },
  countryCode: '+971', // UAE as default
  latitude: null,
  longitude: null,
  errors: {},
  touched: {},
  isSubmitted: false,
  isLoading: false,
};

export const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        // Clear error when user starts typing
        errors: state.errors[action.field]
          ? { ...state.errors, [action.field]: undefined }
          : state.errors,
        // Mark as touched if form was submitted
        touched:
          state.isSubmitted && !state.touched[action.field]
            ? { ...state.touched, [action.field]: true }
            : state.touched,
      };

    case 'SET_COUNTRY_CODE':
      return {
        ...state,
        countryCode: action.value,
      };

    case 'SET_LOCATION':
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };

    case 'CLEAR_LOCATION':
      return {
        ...state,
        latitude: null,
        longitude: null,
      };

    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case 'CLEAR_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case 'SET_ALL_TOUCHED':
      return {
        ...state,
        touched: {
          firstName: true,
          lastName: true,
          email: true,
          mobileNumber: true,
          password: true,
          confirmPassword: true,
        },
      };

    case 'SET_IS_SUBMITTED':
      return {
        ...state,
        isSubmitted: action.value,
      };

    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
};
