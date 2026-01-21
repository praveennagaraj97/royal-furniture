import { ViewOnce } from '@/components/shared/animations';
import { BannerItem } from '@/types/response/home';
import { FC } from 'react';
import ResponsiveImage from './responsive-image';

type FullWidthBannerProps = {
  banners: BannerItem[];
};

const FullWidthBanner: FC<FullWidthBannerProps> = ({ banners }) => {
  return (
    <ViewOnce
      type="scaleUp"
      distance={30}
      initialScale={1.05}
      duration={0.8}
      margin="-100px"
      className="relative w-full overflow-hidden"
    >
      {banners.map((banner) => (
        <ResponsiveImage
          key={banner.id}
          images={
            banner.responsive_images || {
              web: banner.image ? { url: banner.image } : undefined,
              ipad: banner.image ? { url: banner.image } : undefined,
              mobile: banner.image ? { url: banner.image } : undefined,
            }
          }
          alt={banner.offer_text || ''}
          className="w-full h-auto"
        />
      ))}
    </ViewOnce>
  );
};

export default FullWidthBanner;
