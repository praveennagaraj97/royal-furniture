'use client';

import { EmptyAddressesState } from '@/components/checkout/shipping/shipping-address-section/states';
import {
  Address,
  AddressList,
  CreateOrEditAddressForm,
  type AddressFormData,
} from '@/components/shared/address';
import { SlideIn } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import AddressSkeleton from '@/components/skeletons/shipping-address-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useGetAddresses } from '@/hooks/api';
import type { UserAddress } from '@/types/response/address';
import { guestAddressStorage } from '@/utils/guest-address-storage';
import { useTranslations } from 'next-intl';
import {
  FC,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiArrowRight, FiPlus, FiX } from 'react-icons/fi';

const addressCategoryToFormType = (
  category: string,
): AddressFormData['addressType'] => {
  if (category === 'home' || category === 'office' || category === 'other') {
    return category;
  }
  return 'home';
};

const mapAddressToFormData = (address: Address): AddressFormData => ({
  name: address.name,
  phone: address.phone,
  email: address.email || '',
  streetAddress: address.area ?? address.street,
  building: address.building || '',
  emirateId: String(address.emirate_detail?.id ?? address.emirate_id ?? ''),
  regionId: String(address.region_detail?.id ?? address.region_id ?? ''),
  notes: address.notes || '',
  addressType: addressCategoryToFormType(address.category),
});

export const UserAddressPage: FC = () => {
  const t = useTranslations('shipping');
  const { isAuthenticated } = useAuth();
  const [guestAddresses, setGuestAddresses] = useState<Address[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: addressesResponse,
    isLoading,
    mutate,
  } = useGetAddresses({
    enabled: isAuthenticated,
  });

  const parsedAddresses = useMemo(() => {
    if (isAuthenticated) {
      if (!addressesResponse?.data) return [] as Address[];
      return addressesResponse.data.flatMap((group) => group.addresses || []);
    }

    return guestAddresses;
  }, [isAuthenticated, addressesResponse, guestAddresses]);

  useEffect(() => {
    if (!isAuthenticated) {
      startTransition(() => {
        setGuestAddresses(guestAddressStorage.getAll());
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    startTransition(() => {
      setAddresses(
        parsedAddresses.map((addr) => ({
          ...addr,
          selected: false,
        })),
      );
    });
  }, [parsedAddresses]);

  const handleAddressSaved = (address: UserAddress, wasCreated: boolean) => {
    setAddresses((prev) =>
      (wasCreated
        ? [
            ...prev.filter((entry) => String(entry.id) !== String(address.id)),
            address,
          ]
        : prev.map((entry) =>
            String(entry.id) === String(address.id)
              ? { ...entry, ...address }
              : entry,
          )
      ).map((entry) => ({
        ...entry,
        selected: false,
      })),
    );
    if (!isAuthenticated) {
      setGuestAddresses(guestAddressStorage.getAll());
    }
    void mutate?.();
    setIsModalOpen(false);
    setEditAddress(null);
  };

  const handleDeleteAddress = (address: Address) => {
    if (isAuthenticated) {
      return;
    }

    guestAddressStorage.remove(Number(address.id));
    const nextGuestAddresses = guestAddressStorage.getAll();
    setGuestAddresses(nextGuestAddresses);
  };

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditAddress(null);
  };

  const handleAddNew = () => {
    setEditAddress(null);
    setIsModalOpen(true);
  };

  const handleSubmitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
    }
  };

  const shouldShowSkeleton = isAuthenticated && isLoading && !addresses.length;
  const shouldShowEmptyState = !shouldShowSkeleton && !addresses.length;

  return (
    <SlideIn>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            {t('titles.shippingAddress')}
          </h2>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-deep-maroon hover:underline transition-colors"
          >
            <FiPlus className="h-4 w-4" />
            {t('actions.addNew')}
          </button>
        </div>

        {shouldShowSkeleton ? (
          <AddressSkeleton />
        ) : shouldShowEmptyState ? (
          <EmptyAddressesState />
        ) : (
          <AddressList
            addresses={addresses}
            onEdit={handleEdit}
            onSelect={() => {}}
            isGuest={!isAuthenticated}
            showEditAction={true}
            onDeleteAddress={handleDeleteAddress}
            mutateAddresses={mutate}
            hideSelection={true}
          />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="md"
          variant="bottom"
        >
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {editAddress
                  ? t('actions.editAddress')
                  : t('actions.addAddress')}
              </h2>

              <button
                onClick={handleCloseModal}
                className="p-1 rounded-full bg-deep-maroon flex items-center justify-center"
              >
                <FiX className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <CreateOrEditAddressForm
                onCancel={handleCloseModal}
                onSaved={handleAddressSaved}
                isGuest={!isAuthenticated}
                initialData={
                  editAddress ? mapAddressToFormData(editAddress) : undefined
                }
                initialIsDefault={Boolean(editAddress?.is_default)}
                editMode={!!editAddress}
                mutateAddresses={mutate}
                editingAddressId={editAddress?.id}
                showDefaultToggle={true}
                hideSubmitButton={true}
                formRef={formRef}
                onSubmittingChange={setIsSubmitting}
              />
            </div>

            {/* Footer - Fixed Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmitForm}
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-deep-maroon px-4 py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#6b0000] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? t('actions.savingAddress')
                  : editAddress
                    ? t('actions.saveAddress')
                    : t('actions.addAddress')}
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </SlideIn>
  );
};

export default UserAddressPage;
