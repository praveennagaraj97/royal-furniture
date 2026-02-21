export type AddressType = 'home' | 'office' | 'other';

export interface AddressFormData {
  name: string;
  phone: string;
  email: string;
  streetAddress: string;
  building: string;
  city: string;
  notes: string;
  addressType: AddressType;
}

export interface AddressFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  streetAddress?: string;
  building?: string;
  city?: string;
  notes?: string;
}

export interface AddressFormTouched {
  name?: boolean;
  phone?: boolean;
  email?: boolean;
  streetAddress?: boolean;
  building?: boolean;
  city?: boolean;
  notes?: boolean;
}

export interface AddressFormState {
  formData: AddressFormData;
  errors: AddressFormErrors;
  touched: AddressFormTouched;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isUsingLocation: boolean;
}

export const initialAddressFormState: AddressFormState = {
  formData: {
    name: '',
    phone: '',
    email: '',
    streetAddress: '',
    building: '',
    city: '',
    notes: '',
    addressType: 'home',
  },
  errors: {},
  touched: {},
  isSubmitted: false,
  isSubmitting: false,
  isUsingLocation: false,
};

export type AddressFormAction =
  | { type: 'SET_FIELD_VALUE'; field: keyof AddressFormData; value: string }
  | { type: 'SET_TOUCHED'; field: keyof AddressFormTouched }
  | { type: 'SET_ALL_TOUCHED' }
  | { type: 'SET_ERRORS'; errors: AddressFormErrors }
  | { type: 'SET_ADDRESS_TYPE'; value: AddressType }
  | { type: 'SET_IS_SUBMITTED'; value: boolean }
  | { type: 'SET_IS_SUBMITTING'; value: boolean }
  | { type: 'SET_IS_USING_LOCATION'; value: boolean }
  | { type: 'RESET' };

export const addressFormReducer = (
  state: AddressFormState,
  action: AddressFormAction,
): AddressFormState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
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
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SET_ALL_TOUCHED':
      return {
        ...state,
        touched: Object.keys(state.formData).reduce((acc, key) => {
          acc[key as keyof AddressFormTouched] = true;
          return acc;
        }, {} as AddressFormTouched),
      };
    case 'SET_ADDRESS_TYPE':
      return {
        ...state,
        formData: {
          ...state.formData,
          addressType: action.value,
        },
      };
    case 'SET_IS_SUBMITTED':
      return {
        ...state,
        isSubmitted: action.value,
      };
    case 'SET_IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.value,
      };
    case 'SET_IS_USING_LOCATION':
      return {
        ...state,
        isUsingLocation: action.value,
      };
    case 'RESET':
      return initialAddressFormState;
    default:
      return state;
  }
};
