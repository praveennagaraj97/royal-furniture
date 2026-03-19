import type {
  ShippingProceedApiData,
  ShippingSelection,
  ShippingSubmitPayload,
} from '@/types/response/cart';
import { guestAddressStorage } from '@/utils/guest-address-storage';

import { buildGuestAddressPayload } from '../shipping';

type ShippingMethod = 'home' | 'pickup';

interface BuildShippingSubmitPayloadArgs {
  shippingData?: ShippingProceedApiData;
  shippingMethod: ShippingMethod;
  shippingSelection: ShippingSelection;
}

export const buildShippingSubmitPayload = ({
  shippingData,
  shippingMethod,
  shippingSelection,
}: BuildShippingSubmitPayloadArgs): ShippingSubmitPayload => {
  const basePayload: ShippingSubmitPayload = {
    delivery_method: shippingMethod,
  };

  if (shippingMethod === 'home') {
    if (shippingData?.is_guest) {
      const guestAddress =
        shippingSelection.addressId != null
          ? guestAddressStorage.findById(Number(shippingSelection.addressId))
          : null;

      return {
        ...basePayload,
        guest_address: buildGuestAddressPayload(
          guestAddress ??
            shippingData.guest_user_address ??
            shippingData.shipping_address,
        ),
        custom_delivery: shippingSelection.isCustomDelivery
          ? {
              is_custom_delivery: true,
              slot_id: shippingSelection.slotId,
              delivery_date: shippingSelection.date,
            }
          : {
              is_custom_delivery: false,
            },
      };
    }

    return {
      ...basePayload,
      address_id: shippingSelection.addressId,
      custom_delivery: shippingSelection.isCustomDelivery
        ? {
            is_custom_delivery: true,
            slot_id: shippingSelection.slotId,
            delivery_date: shippingSelection.date,
          }
        : {
            is_custom_delivery: false,
          },
    };
  }

  return {
    ...basePayload,
    store_id: shippingSelection.storeId,
    custom_delivery:
      shippingSelection.pickupSlotId || shippingSelection.pickupDate
        ? {
            slot_id: shippingSelection.pickupSlotId,
            delivery_date: shippingSelection.pickupDate,
          }
        : undefined,
  };
};
