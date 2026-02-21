import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiStorefrontFill } from 'react-icons/pi';

interface HelpCardProps {
  className?: string;
  productName: string;
}

export const ProductNoteCard: FC<HelpCardProps> = ({
  className,
  productName,
}) => {
  const t = useTranslations('product.help');

  return (
    <div className={className}>
      {/* Note Card */}
      <div className="mb-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-600">
        <span className="font-medium mr-1">{t('noteLabel')}</span>
        {t('noteDescription', { productName })}
      </div>
      {/* Help Card */}
    </div>
  );
};

export const ProductHelpCard: FC = () => {
  const t = useTranslations('product.help');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-4">
      <div className="text-lg font-medium  mb-2">{t('helpTitle')}</div>
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <FaPhoneAlt className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            {t('requestCall')}
          </a>
        </li>

        <li className="flex items-center gap-3">
          <BsChatDots className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            {t('chatWithUs')}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <PiStorefrontFill className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            {t('visitStore')}
          </a>
        </li>
      </ul>
    </div>
  );
};
