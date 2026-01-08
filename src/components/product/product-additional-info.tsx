'use client';

import { ViewOnce } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi';
import { HiMapPin } from 'react-icons/hi2';
import type { ProductDetailData } from './types';

export interface ProductAdditionalInfoProps {
  product: ProductDetailData;
}

export const ProductAdditionalInfo: React.FC<ProductAdditionalInfoProps> = ({
  product,
}) => {
  const [isFlexiPaymentModalOpen, setIsFlexiPaymentModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {/* Delivery Information */}
        {product.deliveryDate && (
          <ViewOnce
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.1}
            amount={0.01}
            margin="-100px"
          >
            <div className="p-4 bg-deep-maroon/5 rounded-lg flex flex-col items-start gap-3">
              <div className="flex items-center gap-2 text-sm text-deep-maroon min-w-0">
                <HiMapPin className="text-deep-maroon text-xl min-w-5" />
                <span>Delivery on</span>
                <span className="font-semibold text-indigo-slate">
                  {product.deliveryDate}
                </span>
              </div>
              <button
                type="button"
                className="text-indigo-slate hover:underline font-medium text-sm whitespace-nowrap"
              >
                Update location
              </button>
            </div>
          </ViewOnce>
        )}

        {/* Flexi Payment */}
        <ViewOnce
          type="slideUp"
          distance={15}
          duration={0.4}
          delay={0.2}
          amount={0.01}
          margin="-100px"
        >
          <div className="p-2 pl-4 bg-deep-maroon/10 rounded-lg flex space-x-2 items-start">
            <GiWallet className="text-xl text-deep-maroon mt-1" />
            <div>
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="font-medium">Flexi Payment Available</div>
                  <div className="text-xs text-deep-maroon font-medium">
                    Pay 20% now, the rest before delivery.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFlexiPaymentModalOpen(true)}
                className="text-indigo-slate hover:underline text-sm font-medium whitespace-nowrap shrink-0"
              >
                See More
              </button>
            </div>
          </div>
        </ViewOnce>
      </div>

      {/* Flexi Payment Info Modal */}
      <Modal
        isOpen={isFlexiPaymentModalOpen}
        onClose={() => setIsFlexiPaymentModalOpen(false)}
        variant="center"
        size="md"
        className="sm:max-w-md"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-start justify-between  pb-4">
            <h2 className="text-xl font-medium text-gray-900">Info</h2>
            <button
              type="button"
              onClick={() => setIsFlexiPaymentModalOpen(false)}
              className="w-8 h-8 rounded-full bg-deep-maroon flex items-center justify-center hover:bg-[#6b0000] transition-colors duration-200"
              aria-label="Close"
            >
              <FiX className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 pb-6 overflow-y-auto">
            <div className="space-y-6">
              {/* What is Flexi Payment? */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is Flexi Payment?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Flexi Payment lets you book your order by paying a part of the
                  total amount upfront and the rest before delivery.
                </p>
              </div>

              {/* How does it work? */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does it work?
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="leading-relaxed">
                    <span className="font-medium">1.</span> Pay 20% upfront to
                    confirm your order.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium">2.</span> Pay the remaining
                    80% before delivery.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium">3.</span> Available only for
                    select products.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFlexiPaymentModalOpen(false)}
            className="w-full bg-deep-maroon text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#6b0000] transition-colors duration-200"
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};
