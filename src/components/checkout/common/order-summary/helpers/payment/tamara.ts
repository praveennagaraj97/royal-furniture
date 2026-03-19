export const isTamaraSelected = (
  selectedPaymentMethod?: string,
): selectedPaymentMethod is 'tamara' => {
  return selectedPaymentMethod === 'tamara';
};
