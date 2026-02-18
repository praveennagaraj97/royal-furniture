'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { OrderSummarySection } from '../common/order-summary';

import applePayIcon from '@/assets/payments/apple-pay.png';
import paypalIcon from '@/assets/payments/paypal.png';
import samsungPayIcon from '@/assets/payments/samsung-pay.png';
import tabbyIcon from '@/assets/payments/tabby.png';
import tamaraIcon from '@/assets/payments/tamara.png';

export const PaymentPageContent: FC = () => {
  const [selected, setSelected] = useState<string>('card-1');

  const cardItems = [
    { id: 'card-1', label: 'Mastercard •••• 9722', icon: null },
    { id: 'card-2', label: 'Visa •••• 5877', icon: null },
  ];

  const otherMethods = [
    { id: 'apple-pay', label: 'Apple Pay', img: applePayIcon },
    { id: 'samsung-pay', label: 'Samsung Pay', img: samsungPayIcon },
    { id: 'tabby', label: 'Tabby', img: tabbyIcon },
    { id: 'tamara', label: 'Tamara', img: tamaraIcon },
    { id: 'paypal', label: 'PayPal', img: paypalIcon },
  ];

  return (
    <div className="section-container">
      <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-medium text-gray-900">
                  Payment Method
                </h2>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-indigo-slate">
                Credit & Debit Card
              </h3>

              <div className="space-y-3">
                {cardItems.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelected(card.id)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === card.id ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        {card.label}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected === card.id}
                        onChange={() => setSelected(card.id)}
                        aria-label={card.label}
                      />
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setSelected('add-card')}
                  className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === 'add-card' ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <FiPlus className="h-4 w-4 text-deep-maroon" />
                    <span className="font-medium">Add New Card</span>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="payment"
                      checked={selected === 'add-card'}
                      onChange={() => setSelected('add-card')}
                      aria-label="Add New Card"
                    />
                  </div>
                </button>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={30}>
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-indigo-slate">
                Other method
              </h3>

              <div className="space-y-3">
                {otherMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelected(m.id)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-gray-700 ${selected === m.id ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="h-6 w-20 flex items-center">
                      <Image
                        src={m.img}
                        alt={m.label}
                        className="object-contain h-6 w-auto"
                        width={80}
                        height={24}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{m.label}</div>
                    </div>
                    <div className="shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected === m.id}
                        onChange={() => setSelected(m.id)}
                        aria-label={m.label}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </StaggerItem>
        </div>

        <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
          <StaggerItem type="slideUp" distance={30}>
            <OrderSummarySection step="payment" showPaymentPlans={true} />
          </StaggerItem>

          {/* Pay Now is provided inside OrderSummaryCard for the payment step */}
        </div>
      </StaggerContainer>
    </div>
  );
};

export default PaymentPageContent;
