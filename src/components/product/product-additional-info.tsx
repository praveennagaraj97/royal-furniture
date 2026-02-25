'use client';

import { ViewOnce } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import type { ProductDetailData } from '@/types/response';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi';
import { HiMapPin } from 'react-icons/hi2';
import { IoStorefront } from 'react-icons/io5';
import StoreLocatorModal from './store-locator-modal';

export interface ProductAdditionalInfoProps {
  product: ProductDetailData;
}

export const ProductAdditionalInfo: FC<ProductAdditionalInfoProps> = ({
  product,
}) => {
  const t = useTranslations('product.paymentDelivery');
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
            <div className="p-4 bg-[#FFF4F4] rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs md:text-sm text-deep-maroon min-w-0 flex-1">
                <HiMapPin className="text-deep-maroon text-lg md:text-xl shrink-0" />
                <span className="truncate">{t('deliveryOn')}</span>
                <span className="font-semibold text-indigo-slate shrink-0">
                  {product.delivery_info.estimated_delivery}
                </span>
              </div>
              <button
                type="button"
                className="text-indigo-slate hover:underline font-medium text-xs md:text-sm whitespace-nowrap shrink-0 ml-2"
              >
                {t('update')}
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
              <span className="font-semibold text-sm  ">{t('tryInStore')}</span>
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
            <button
              type="button"
              onClick={() => setIsFlexiPaymentModalOpen(true)}
              className=" p-4 bg-deep-maroon/10 rounded-lg transition-colors duration-200 group w-full"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GiWallet className="text-xl text-deep-maroon" />
                  <span className="font-semibold text-sm  ">
                    {t('flexiPaymentAvailable')}
                  </span>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
              </div>
              <p className="text-deep-maroon text-left text-xs mt-2">
                {t('flexiPaymentNote')}
              </p>
            </button>
          </ViewOnce>
        )}
      </div>

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        productSlug={product.header.product_slug}
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
            <h2 className="text-lg md:text-xl font-medium  ">
              {t('modal.title')}
            </h2>
            <button
              type="button"
              onClick={() => setIsFlexiPaymentModalOpen(false)}
              className="w-8 h-8 rounded-full bg-deep-maroon flex items-center justify-center hover:bg-[#6b0000] transition-colors duration-200"
              aria-label={t('modal.closeAria')}
            >
              <FiX className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 pb-6 overflow-y-auto">
            <div className="space-y-6">
              {/* What is Flexi Payment? */}
              <div>
                <h3 className="text-base md:text-lg font-semibold   mb-2">
                  {product.flexi_payment.modal_content.title ||
                    t('modal.flexiTitle')}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {product.flexi_payment.modal_content.description ||
                    t('modal.flexiDescription')}
                </p>
              </div>

              {/* How does it work? */}
              {product.flexi_payment.modal_content.benefits.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold   mb-3">
                    {t('modal.benefitsTitle')}
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
            {t('modal.close')}
          </button>
        </div>
      </Modal>
    </>
  );
};
