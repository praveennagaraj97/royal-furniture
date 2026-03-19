export const isSamsungPaySelected = (
  selectedPaymentMethod?: string,
): selectedPaymentMethod is 'samsung_pay' => {
  return selectedPaymentMethod === 'samsung_pay';
};
