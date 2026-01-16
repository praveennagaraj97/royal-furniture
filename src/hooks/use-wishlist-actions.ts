'use client';

import { wishlistService } from '@/services/api/wishlist-service';
import { useToast } from '@/contexts/toast-context';
import { useGetWishlistCollections } from './api/use-get-wishlist-collections';
import { useCallback, useState } from 'react';

interface UseWishlistActionsReturn {
  addToWishlist: (variantId: number, collectionId?: number) => Promise<void>;
  removeFromWishlist: (variantId: number) => Promise<void>;
  isAdding: boolean;
  isRemoving: boolean;
  collections: Array<{ id: number; title: string; is_default: boolean }>;
}

export const useWishlistActions = (): UseWishlistActionsReturn => {
  const { showSuccess, showError } = useToast();
  const { collections, mutate: mutateCollections } = useGetWishlistCollections();
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const addToWishlist = useCallback(
    async (variantId: number, collectionId?: number) => {
      setIsAdding(true);
      try {
        await wishlistService.addItem({
          variant_id: variantId,
          ...(collectionId && { collection_id: collectionId }),
        });
        showSuccess('Item added to wishlist');
        mutateCollections(); // Refresh collections
      } catch (error) {
        const parsedError = error as {
          generalError?: string;
          fieldErrors?: Record<string, string>;
        };
        const errorMessage =
          parsedError?.generalError ||
          parsedError?.fieldErrors?.variant_id ||
          'Failed to add item to wishlist. Please try again.';
        showError(errorMessage);
        throw error;
      } finally {
        setIsAdding(false);
      }
    },
    [showSuccess, showError, mutateCollections]
  );

  const removeFromWishlist = useCallback(
    async (variantId: number) => {
      setIsRemoving(true);
      try {
        await wishlistService.removeVariant(variantId);
        showSuccess('Item removed from wishlist');
        mutateCollections(); // Refresh collections
      } catch (error) {
        const parsedError = error as {
          generalError?: string;
          fieldErrors?: Record<string, string>;
        };
        const errorMessage =
          parsedError?.generalError ||
          'Failed to remove item from wishlist. Please try again.';
        showError(errorMessage);
        throw error;
      } finally {
        setIsRemoving(false);
      }
    },
    [showSuccess, showError, mutateCollections]
  );

  return {
    addToWishlist,
    removeFromWishlist,
    isAdding,
    isRemoving,
    collections: collections.map((c) => ({
      id: c.id,
      title: c.title,
      is_default: c.is_default,
    })),
  };
};
