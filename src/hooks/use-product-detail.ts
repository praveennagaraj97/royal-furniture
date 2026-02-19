import { useCart } from '@/contexts/cart-context';
import { useGetProductDetail } from '@/hooks/api/use-get-product-detail';
import { useAppRouter } from '@/hooks/use-navigation';
import type { ProductDetailData } from '@/types/response';
import { startTransition, useEffect, useMemo, useState } from 'react';

const parsePrice = (value?: string | null): number => {
  if (!value) return 0;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const useProductDetail = (data: ProductDetailData) => {
  const firstVariant = data.variants[0];
  const firstFabric = firstVariant?.fabricsList[0];
  const firstColor = firstFabric?.colorsList[0];

  const [isWishlisted, setIsWishlisted] = useState(
    firstColor?.is_wishlist || false,
  );
  const [selectedVariant, setSelectedVariant] = useState(
    firstVariant?.name || '',
  );
  const [selectedFabric, setSelectedFabric] = useState(firstFabric?.name || '');
  const [selectedColor, setSelectedColor] = useState(
    String(firstColor?.id || ''),
  );
  const [quantity, setQuantity] = useState(1);

  const { addItem, items: cartItems } = useCart();
  const { push } = useAppRouter();
  const [isAdding, setIsAdding] = useState(false);

  const {
    product: liveProduct,
    isVariantWishlisted,
    mutate,
  } = useGetProductDetail({
    productSlug: data.product_info.slug,
    enabled: Boolean(data.product_info.slug),
  });

  const productForUI = liveProduct || data;

  const updateVariantWishlist = (variantId: number, value: boolean) => {
    try {
      mutate?.((current) => {
        if (!current) return current;
        const copy = JSON.parse(JSON.stringify(current));
        const product = copy.data;
        for (const variantGroup of product.variants || []) {
          for (const fabric of variantGroup.fabricsList || []) {
            for (const color of fabric.colorsList || []) {
              if (color.variant_id === variantId) {
                color.is_wishlist = value;
              }
            }
          }
        }
        return copy;
      }, false);
    } catch {
      // swallow
    }
  };

  const selection = useMemo(() => {
    const currentVariant = productForUI.variants.find(
      (v) => v.name === selectedVariant,
    );
    const currentFabric = currentVariant?.fabricsList.find(
      (f) => f.name === selectedFabric,
    );
    const currentColor = currentFabric?.colorsList.find(
      (c) => String(c.id) === selectedColor,
    );

    const sku = currentColor?.sku ?? String(productForUI.product_info.id);
    const price =
      parsePrice(currentColor?.region_prices?.offer_price) ||
      parsePrice(productForUI.product_info.pricing.offer_price);
    const basePrice = parsePrice(
      currentColor?.region_prices?.base_price ??
        (productForUI.product_info.pricing.base_price as string | null),
    );

    return {
      currentVariant,
      currentFabric,
      currentColor,
      mainVariantImage: currentColor?.images?.[0]?.responsive_images,
      sku,
      price,
      basePrice,
      productPriceForPlans: price || 0,
    };
  }, [productForUI, selectedVariant, selectedFabric, selectedColor]);

  useEffect(() => {
    if (selection.currentColor) {
      startTransition(() => {
        setIsWishlisted(selection.currentColor?.is_wishlist || false);
      });
    }
  }, [selection.currentColor]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    if (selection.currentColor?.stock) {
      setQuantity(Math.min(newQuantity, selection.currentColor.stock));
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const sku = selection.sku;
    if (!sku) return;
    setIsAdding(true);
    try {
      await addItem(String(sku), quantity);
    } catch {
      // swallow, already logged
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    push('/checkout/cart');
  };

  const handleGoToCart = () => {
    push('/checkout/cart');
  };

  const currentId = selection.sku;
  const isInCart = cartItems.some((ci) => String(ci.id) === String(currentId));

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: productForUI.product_info.name,
          text: `Check out ${productForUI.product_info.name}`,
          url: window.location.href,
        })
        .catch(() => {
          // swallow
        });
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {
        // swallow
      });
    }
  };

  return {
    product: productForUI,
    selection,
    options: {
      selectedVariant,
      setSelectedVariant,
      selectedFabric,
      setSelectedFabric,
      selectedColor,
      setSelectedColor,
      quantity,
      handleQuantityChange,
    },
    wishlist: {
      isWishlisted,
      setIsWishlisted,
      isVariantWishlisted,
      updateVariantWishlist,
    },
    cart: {
      status: {
        isAdding,
        isInCart,
      },
      actions: {
        handleAddToCart,
        handleBuyNow,
        handleGoToCart,
      },
    },
    share: {
      handleShareClick,
    },
  };
};
