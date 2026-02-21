'use client';

import ShippingAddressSkeleton from '@/components/skeletons/shipping-address-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useGetAddresses } from '@/hooks/api';
import type { AddressCategory, UserAddress } from '@/types/address';
import { useTranslations } from 'next-intl';
import {
  FC,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Address, AddressList } from './address-list';
import CreateOrEditAddressForm from './create-or-edit-form';
import type { AddressFormData } from './create-or-edit-form/reducer';
import { AuthRequiredState, EmptyAddressesState } from './states';

const addressCategoryToFormType = (
  category: AddressCategory,
): AddressFormData['addressType'] => {
  return category;
};

type Props = {
  shippingAddress?: UserAddress | null;
  onShippingRevalidate?: () => Promise<void> | void;
};

export const ShippingAddressSection: FC<Props> = ({
  shippingAddress,
  onShippingRevalidate,
}) => {
  const t = useTranslations('shipping');
  const { isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const selectedAddressIdRef = useRef<string | null>(null);

  const {
    data: addressesResponse,
    isLoading,
    mutate,
  } = useGetAddresses({
    enabled: isAuthenticated,
  });

  const parsedAddresses = useMemo(() => {
    if (!addressesResponse?.data) return [] as Address[];

    return addressesResponse.data.flatMap((group) => group.addresses || []);
  }, [addressesResponse]);

  useEffect(() => {
    startTransition(() => {
      if (!parsedAddresses.length) {
        setAddresses([]);
        selectedAddressIdRef.current = null;
        return;
      }
      const previouslySelected = selectedAddressIdRef.current;
      const defaultSelected = parsedAddresses.find(
        (addr) => addr.is_default,
      )?.id;

      // If parent provided a selected shipping address from the shipping step, prefer that
      const selectedFromShipping = shippingAddress?.id
        ? String(shippingAddress.id)
        : null;

      const selectedIdRaw =
        selectedFromShipping &&
        parsedAddresses.some((a) => String(a.id) === selectedFromShipping)
          ? selectedFromShipping
          : previouslySelected &&
              parsedAddresses.some((a) => String(a.id) === previouslySelected)
            ? previouslySelected
            : String(defaultSelected ?? parsedAddresses[0].id);

      const selectedId = String(selectedIdRaw);

      setAddresses(
        parsedAddresses.map((addr) => ({
          ...addr,
          selected: String(addr.id) === selectedId,
        })),
      );
      selectedAddressIdRef.current = selectedId;
    });
  }, [parsedAddresses, shippingAddress?.id]);

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAddress(null);
  };

  if (!isAuthenticated) {
    return <AuthRequiredState />;
  }

  const shouldShowSkeleton = isLoading && !addresses.length;
  const shouldShowEmptyState = !isLoading && !addresses.length;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          {t('titles.shippingAddress')}
        </h2>
        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEditAddress(null);
            }}
            className="text-xs sm:text-sm font-semibold text-indigo-slate hover:underline"
          >
            {t('actions.addNew')}
          </button>
        )}
      </div>

      {isEditing ? (
        <CreateOrEditAddressForm
          onCancel={handleCancel}
          initialData={
            editAddress
              ? {
                  name: editAddress.name,
                  phone: editAddress.phone,
                  email: editAddress.email || '',
                  streetAddress: editAddress.street,
                  building: editAddress.building || '',
                  city: editAddress.town_or_city,
                  notes: editAddress.notes || '',
                  addressType: addressCategoryToFormType(editAddress.category),
                }
              : undefined
          }
          editMode={!!editAddress}
          mutateAddresses={mutate}
          editingAddressId={editAddress?.id}
          isDefaultSelection={!!editAddress?.selected}
          shouldSetDefaultOnCreate={!editAddress && !addresses.length}
        />
      ) : (
        <>
          {shouldShowSkeleton ? (
            <ShippingAddressSkeleton />
          ) : shouldShowEmptyState ? (
            <EmptyAddressesState />
          ) : (
            <AddressList
              addresses={addresses}
              onEdit={handleEdit}
              mutateAddresses={mutate}
              onShippingRevalidate={onShippingRevalidate}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ShippingAddressSection;
