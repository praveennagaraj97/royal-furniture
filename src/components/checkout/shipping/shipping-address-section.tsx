'use client';

import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { FC, useState } from 'react';
import { Address, AddressList } from './address-list/address-list';
import CreateOrEditAddressForm from './create-or-edit-address';
import { AddressFormData } from './create-or-edit-address/reducer';

export const ShippingAddressSection: FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'Jhon Doe',
      addressLine1: 'Flat 205, Karama Centre Building',
      city: 'Al Karama, Dubai',
      country: 'UAE',
      phone: '+971 50 987 6543',
      selected: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'Jhon Doe',
      company: 'XYZ Trading LLC',
      addressLine1: 'Office 302, Karama Business Tower',
      addressLine2: '',
      city: 'Al Karama, Dubai',
      country: 'UAE',
      phone: '+971 4 123 4567',
      selected: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsEditing(true);
  };
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };
  const confirmDelete = () => {
    if (deleteId) {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);
    }
  };
  const cancelDelete = () => setDeleteId(null);
  const handleSelect = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, selected: a.id === id })));
  };
  const handleSave = (data: AddressFormData) => {
    // Only allow 'home' or 'work' for Address.type
    const addressType: 'home' | 'work' =
      data.addressType === 'work' ? 'work' : 'home';
    if (editAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editAddress.id
            ? {
                ...a,
                name: data.name,
                phone: data.phone,
                type: addressType,
                addressLine1: data.streetAddress,
                city: data.city,
                country: a.country || 'UAE',
                company: addressType === 'work' ? a.company || '' : undefined,
                addressLine2: a.addressLine2 || '',
              }
            : a,
        ),
      );
    } else {
      setAddresses((prev) => [
        ...prev.map((a) => ({ ...a, selected: false })),
        {
          id: Date.now().toString(),
          name: data.name,
          phone: data.phone,
          type: addressType,
          addressLine1: data.streetAddress,
          city: data.city,
          country: 'UAE',
          company: addressType === 'work' ? '' : undefined,
          addressLine2: '',
          selected: true,
        },
      ]);
    }
    setIsEditing(false);
    setEditAddress(null);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditAddress(null);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          Shipping address
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
            Add New
          </button>
        )}
      </div>

      {isEditing ? (
        <CreateOrEditAddressForm
          onCancel={handleCancel}
          onAddressSaved={handleSave}
          initialData={
            editAddress
              ? {
                  name: editAddress.name,
                  phone: editAddress.phone,
                  email: '',
                  streetAddress: editAddress.addressLine1,
                  building: '',
                  city: editAddress.city,
                  notes: '',
                  addressType: editAddress.type,
                }
              : undefined
          }
          editMode={!!editAddress}
        />
      ) : (
        <AddressList
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
        />
      )}

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </section>
  );
};

export default ShippingAddressSection;
