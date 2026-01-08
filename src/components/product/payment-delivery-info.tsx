'use client';

import { ViewOnce } from '@/components/shared/animations';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import applePayIcon from '@/assets/payments/apple-pay.png';
import paypalIcon from '@/assets/payments/paypal.png';
import samsungPayIcon from '@/assets/payments/samsung-pay.png';
import tabbyIcon from '@/assets/payments/tabby.png';
import tamaraIcon from '@/assets/payments/tamara.png';
import { FaTruckFast } from 'react-icons/fa6';

import type { ProductDetailData } from '@/types/response';

interface PaymentDeliveryInfoProps {
  productPrice?: number;
  deliveryInfo?: ProductDetailData['delivery_info'];
  flexiPayment?: ProductDetailData['flexi_payment'];
  paymentOptions?: ProductDetailData['payment_options'];
  freeAssembly?: ProductDetailData['free_assembly'];
  expressDeliveryTimer?: ProductDetailData['express_delivery_timer'];
}

const formatCountdown = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
    2,
    '0'
  )}m ${String(seconds).padStart(2, '0')}s`;
};

export const PaymentDeliveryInfo: React.FC<PaymentDeliveryInfoProps> = ({
  productPrice = 4485,
  deliveryInfo,
  flexiPayment,
  paymentOptions,
  freeAssembly,
  expressDeliveryTimer,
}) => {
  // Calculate payment plan amounts (4 payments)
  const tabbyAmount = (productPrice / 4).toFixed(2);
  const tamaraAmount = (productPrice / 4).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Express delivery countdown - 2 hours 12 minutes 8 seconds = 7928 seconds
  const [countdown, setCountdown] = useState(7928);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="space-y-4">
      {/* Tabby Payment Plan Card */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.4}
        amount={0.01}
        margin="-100px"
      >
        <div className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
          <Image
            src={tabbyIcon}
            alt="Tabby"
            width={60}
            height={30}
            className="h-4 w-auto object-contain"
          />
          <div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                4 interest-free payments or as low as{' '}
                <span className="text-red-600 font-bold">
                  ฿{tabbyAmount}/month.
                </span>
              </p>
            </div>
            <button
              type="button"
              className="text-indigo-slate hover:underline text-sm font-medium whitespace-nowrap"
            >
              More options
            </button>
          </div>
        </div>
      </ViewOnce>

      {/* Tamara Payment Plan Card */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.45}
        amount={0.01}
        margin="-100px"
      >
        <div className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
          <Image
            src={tamaraIcon}
            alt="Tamara"
            width={60}
            height={30}
            className="h-4 w-auto object-contain"
          />
          <div className="">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                Or split in 4 payments of{' '}
                <span className="text-red-600 font-bold">฿{tamaraAmount}</span>{' '}
                No late fees, Sharia compliant!
              </p>
            </div>
            <button
              type="button"
              className="text-indigo-slate hover:underline text-sm font-medium whitespace-nowrap"
            >
              Learn more
            </button>
          </div>
        </div>
      </ViewOnce>

      {/* Ways of Payment Section */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.25}
        amount={0.01}
        margin="-100px"
      >
        <div className="space-y-3">
          <h3 className="font-medium text-indigo-slate">Ways of Payment</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Image
              src={tamaraIcon}
              alt="Tamara"
              width={80}
              height={40}
              className="h-6 w-auto object-contain"
            />
            <Image
              src={tabbyIcon}
              alt="Tabby"
              width={80}
              height={40}
              className="h-6 w-auto object-contain"
            />

            <Image
              src={samsungPayIcon}
              alt="Samsung Pay"
              width={80}
              height={40}
              className="h-6 w-auto object-contain"
            />
            <Image
              src={applePayIcon}
              alt="Apple Pay"
              width={80}
              height={40}
              className="h-6 w-auto object-contain"
            />
            <Image
              src={paypalIcon}
              alt="PayPal"
              width={80}
              height={40}
              className="h-6 w-auto object-contain"
            />
          </div>
        </div>
      </ViewOnce>

      {/* Free Assembly Available Card */}
      {freeAssembly?.is_assemble && (
        <ViewOnce
          type="slideUp"
          distance={15}
          duration={0.4}
          delay={0.3}
          amount={0.01}
          margin="-100px"
        >
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold mb-1.5">
              <span className="text-green-600">Free</span>{' '}
              <span className="text-gray-900">Assembly Available</span>
            </h4>
            <p className="text-sm text-gray-700">
              {freeAssembly.description ||
                'We will happily assemble your furniture for you at no additional cost'}
            </p>
          </div>
        </ViewOnce>
      )}

      {/* Express Delivery Available Card */}
      {expressDeliveryTimer?.available &&
        deliveryInfo?.supports_express_delivery && (
          <ViewOnce
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.35}
            amount={0.01}
            margin="-100px"
          >
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <FaTruckFast className="text-deep-maroon text-lg" />
                <h4 className="text-sm font-bold">
                  <span className="text-green-600">Express Delivery</span>{' '}
                  <span className="text-gray-900">Available</span>
                </h4>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                Get it by {deliveryInfo.express_delivery_duration || 'tomorrow'}{' '}
                If ordered within{' '}
                <span className="text-red-600 font-medium">
                  {formatCountdown(countdown)}
                </span>
              </p>
              {deliveryInfo.express_delivery_charge && (
                <p className="text-xs text-gray-600">
                  Extra Charges: {deliveryInfo.express_delivery_charge}
                </p>
              )}
            </div>
          </ViewOnce>
        )}
    </div>
  );
};
