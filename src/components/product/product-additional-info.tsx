'use client';

import { ViewOnce } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import type { ProductDetailData } from '@/types/response';
import { useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi';
import { HiMapPin } from 'react-icons/hi2';
import { IoStorefront } from 'react-icons/io5';
import StoreLocatorModal from './store-locator-modal';

export interface ProductAdditionalInfoProps {
  product: ProductDetailData;
}

export const ProductAdditionalInfo: React.FC<ProductAdditionalInfoProps> = ({
  product,
}) => {
  const [isFlexiPaymentModalOpen, setIsFlexiPaymentModalOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {/* Delivery Information */}
        {product.delivery_info.estimated_delivery && (
          <ViewOnce
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.1}
            amount={0.01}
            margin="-40px"
          >
            <div className="p-4 bg-deep-maroon/5 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs md:text-sm text-deep-maroon min-w-0 flex-1">
                <HiMapPin className="text-deep-maroon text-lg md:text-xl shrink-0" />
                <span className="truncate">Delivery on</span>
                <span className="font-semibold text-indigo-slate shrink-0">
                  {product.delivery_info.estimated_delivery}
                </span>
              </div>
              <button
                type="button"
                className="text-indigo-slate hover:underline font-medium text-xs md:text-sm whitespace-nowrap shrink-0 ml-2"
              >
                Update
              </button>
            </div>
          </ViewOnce>
        )}

        {/* Try in Store Button */}
        <ViewOnce
          type="slideUp"
          distance={15}
          duration={0.4}
          delay={0.15}
          amount={0.01}
          margin="-40px"
        >
          <button
            type="button"
            onClick={() => setIsStoreLocatorOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-deep-maroon/10 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center gap-2">
              <IoStorefront className="text-xl text-deep-maroon" />
              <span className="font-semibold text-sm text-gray-900">
                Try in store!
              </span>
            </div>
            <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
          </button>
        </ViewOnce>

        {/* Flexi Payment */}
        {product.flexi_payment.available && (
          <ViewOnce
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.2}
            amount={0.01}
            margin="-40px"
          >
            <div className="p-2 pl-4 bg-deep-maroon/10 rounded-lg flex space-x-2 items-start">
              <GiWallet className="text-lg md:text-xl text-deep-maroon mt-1" />
              <div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Flexi Payment Available</div>
                    <div className="text-xs md:text-sm text-deep-maroon font-medium">
                      {product.flexi_payment.description ||
                        `Pay ${product.flexi_payment.upfront_percentage}% now, the rest before delivery.`}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFlexiPaymentModalOpen(true)}
                  className="text-indigo-slate hover:underline text-xs md:text-sm font-medium whitespace-nowrap shrink-0"
                >
                  See More
                </button>
              </div>
            </div>
          </ViewOnce>
        )}
      </div>

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

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
            <h2 className="text-lg md:text-xl font-medium text-gray-900">
              Info
            </h2>
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
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {product.flexi_payment.modal_content.title ||
                    'What is Flexi Payment?'}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {product.flexi_payment.modal_content.description ||
                    'Flexi Payment lets you book your order by paying a part of the total amount upfront and the rest before delivery.'}
                </p>
              </div>

              {/* How does it work? */}
              {product.flexi_payment.modal_content.benefits.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    Benefits
                  </h3>
                  <ol className="space-y-2 text-xs md:text-sm text-gray-600">
                    {product.flexi_payment.modal_content.benefits.map(
                      (benefit, index) => (
                        <li key={index} className="leading-relaxed">
                          <span className="font-medium text-xs md:text-sm">
                            {index + 1}.
                          </span>{' '}
                          {benefit}
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              )}
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
