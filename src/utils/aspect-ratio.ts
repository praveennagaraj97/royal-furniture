import { ResponsiveImages } from '@/types/response';

export function computeAspectRatioFromResponsive(
  images?: ResponsiveImages,
  vw?: number,
): number | null {
  if (!images) return null;

  const viewport = typeof window !== 'undefined' ? window.innerWidth : 0;
  const width = vw ?? viewport;

  let variant = images.mobile;
  if (width >= 1024) variant = images.web || images.ipad || images.mobile;
  else if (width >= 768) variant = images.ipad || images.mobile || images.web;

  if (variant && variant.width && variant.height)
    return variant.width / variant.height;

  return null;
}

export default computeAspectRatioFromResponsive;
