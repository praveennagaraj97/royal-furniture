'use client';

import Modal from '@/components/shared/modal';
import TryInStoreSkeleton from '@/components/skeletons/try-in-store-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useDebounce } from '@/hooks';
import { useGetTryInStore } from '@/hooks/api';
import { userService } from '@/services/api/user-service';
import type { TryInStoreStore } from '@/types/response/store';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { IoClose, IoLocationSharp, IoStorefront } from 'react-icons/io5';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productSlug: string;
}

const StoreLocatorModal: FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  productSlug,
}) => {
  const t = useTranslations('product.storeLocator');
  const tCommon = useTranslations('common');
  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const hasRequestedLocationRef = useRef(false);

  const {
    stores = [],
    isLoading,
    isValidating,
  } = useGetTryInStore({
    productSlug,
    search: debouncedSearch,
    latitude,
    longitude,
    enabled: isOpen && Boolean(productSlug),
  });

  const [selectedStore, setSelectedStore] = useState<TryInStoreStore | null>(
    null,
  );

  useEffect(() => {
    if (stores.length === 0) return;

    setSelectedStore((prev) => {
      if (prev && stores.some((s) => s.store_id === prev.store_id)) {
        return prev;
      }
      return stores[0];
    });
  }, [stores]);

  useEffect(() => {
    if (!isOpen || hasRequestedLocationRef.current) return;
    if (typeof window === 'undefined' || !('geolocation' in navigator)) return;

    hasRequestedLocationRef.current = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Failed to get user location:', error);
      },
    );
  }, [isOpen]);

  const bounds = useMemo(() => {
    if (!stores.length) return null;
    const lats = stores.map((s) => s.location.lat);
    const longs = stores.map((s) => s.location.long);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLong = Math.min(...longs);
    const maxLong = Math.max(...longs);

    return { minLat, maxLat, minLong, maxLong };
  }, [stores]);

  const handleSetLocation = async () => {
    if (!latitude || !longitude) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    try {
      setIsUpdatingLocation(true);
      await userService.updateLocation({ latitude, longitude });
    } catch (error) {
      console.error('Failed to update user location:', error);
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  const getStockStatus = (store: TryInStoreStore) => {
    const stockCount = store.availability.stock_count;
    const isOutOfStock = store.availability.is_out_of_stock;

    if (isOutOfStock || stockCount === 0) {
      return (
        <span className="text-red-500 font-semibold">{t('stock.out')}</span>
      );
    }

    return (
      <span className="text-green-500 font-semibold">
        {t('stock.onlyLeft', { count: stockCount })}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" variant="center">
      <div className="w-full max-w-7xl bg-white rounded-lg overflow-hidden max-h-[90vh] min-h-105 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200">
          <div className="flex items-center gap-2 min-w-0">
            <IoLocationSharp className="w-5 h-5 sm:w-6 sm:h-6 text-deep-maroon shrink-0" />
            <h2 className="text-lg sm:text-2xl   truncate">{t('title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-deep-maroon hover:bg-[#6b0000] rounded-full transition-colors ml-4 shrink-0"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-0 flex-1 overflow-hidden">
          {/* Left side - Map */}
          <div className="hidden md:flex flex-2 relative flex-col min-w-0">
            {/* Map Area */}
            <div
              className="w-full flex-1 relative overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=25.2048,55.2708&zoom=8&size=800x600&style=feature:all|element:labels|visibility:off&key=AIzaSyDummyKey')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Map overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Search Box - Overlay */}
              <div className="absolute top-3 left-3 z-10 w-64 max-w-xs">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-maroon text-xs sm:text-sm shadow-md"
                  />
                </div>
              </div>

              {/* Set Location Button - Bottom Center Overlay */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                <button
                  onClick={handleSetLocation}
                  disabled={isUpdatingLocation}
                  className={`bg-deep-maroon hover:bg-[#6b0000] text-white py-2.5 px-6 rounded-lg font-semibold transition-colors text-sm shadow-md ${
                    isUpdatingLocation ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {t('setLocation')}
                </button>
              </div>

              {/* Store markers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full">
                  {stores.map((store) => {
                    const position = (() => {
                      if (!bounds) {
                        return { left: '50%', top: '50%' };
                      }

                      const { minLat, maxLat, minLong, maxLong } = bounds;

                      const longRange = maxLong - minLong || 1;
                      const latRange = maxLat - minLat || 1;

                      const left =
                        ((store.location.long - minLong) / longRange) * 100;
                      const top =
                        ((maxLat - store.location.lat) / latRange) * 100;

                      return {
                        left: `${left}%`,
                        top: `${top}%`,
                      };
                    })();

                    return (
                      <button
                        key={store.store_id}
                        onClick={() => setSelectedStore(store)}
                        className={`absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all transform pointer-events-auto ${
                          selectedStore?.store_id === store.store_id
                            ? 'bg-deep-maroon scale-125 shadow-lg'
                            : 'bg-red-500 hover:scale-110 shadow-md'
                        }`}
                        style={position}
                        title={store.name}
                      >
                        <FaLocationCrosshairs className="w-4 h-4 text-white" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Store List */}
          <div className="w-full md:w-96 flex flex-col bg-white md:border-l md:border-gray-200 shrink-0">
            <div className="px-3 py-3 border-b border-gray-200 shrink-0">
              <h3 className="text-base sm:text-lg font-semibold text-indigo-slate">
                {t('selectStore')}
              </h3>
            </div>

            {/* Mobile Search Box */}
            <div className="px-3 py-2 md:hidden">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-maroon text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading || isValidating ? (
                <TryInStoreSkeleton />
              ) : stores.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center text-gray-500 text-sm gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400">
                    <IoStorefront className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-indigo-slate text-sm">
                    {t('noStores')}
                  </p>
                </div>
              ) : (
                <div className="space-y-0 divide-y divide-gray-200">
                  {stores.map((store) => (
                    <button
                      key={store.store_id}
                      onClick={() => setSelectedStore(store)}
                      className={`w-full px-3 py-3 text-left transition-all border-l-4 ${
                        selectedStore?.store_id === store.store_id
                          ? 'bg-blue-50 border-l-deep-maroon'
                          : 'border-l-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold   text-sm">
                            {store.city}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5 truncate">
                            {store.address}
                          </p>
                          <div className="mt-1.5 text-xs">
                            {getStockStatus(store)}
                          </div>
                        </div>
                        <FaLocationCrosshairs className="w-4 h-4 text-deep-maroon shrink-0 mt-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="px-3 py-2 border-t border-gray-200 shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-deep-maroon text-white py-2.5 px-3 rounded-lg font-semibold hover:bg-[#6b0000] transition-colors text-sm"
              >
                {tCommon('continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoreLocatorModal;
