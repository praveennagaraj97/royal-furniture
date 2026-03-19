export const isTabbySelected = (
  selectedPaymentMethod?: string,
): selectedPaymentMethod is 'tabby' => {
  return selectedPaymentMethod === 'tabby';
};
