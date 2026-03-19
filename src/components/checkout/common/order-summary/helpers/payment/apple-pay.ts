export const isApplePaySelected = (
  selectedPaymentMethod?: string,
): selectedPaymentMethod is 'apple_pay' => {
  return selectedPaymentMethod === 'apple_pay';
};
