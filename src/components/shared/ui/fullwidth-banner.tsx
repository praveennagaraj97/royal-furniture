import { ViewOnce } from '@/components/shared/animations';
import { BannerItem } from '@/types/response/home';
import Image from 'next/image';
import { FC } from 'react';

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
      className="relative w-full rounded-lg overflow-hidden"
    >
      {banners.map((banner) => (
        <Image
          key={banner.id}
          src={banner.image || ''}
          alt={banner.offer_text || ''}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      ))}
    </ViewOnce>
  );
};

export default FullWidthBanner;
