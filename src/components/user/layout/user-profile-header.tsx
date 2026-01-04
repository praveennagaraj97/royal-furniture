'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useUser } from '@/contexts/user-context';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const UserProfileHeader: FC = () => {
  const { user } = useUser();
  const t = useTranslations('user');

  const displayName = useMemo(() => {
    if (!user) return 'User';
    const firstName = user.first_name?.trim() || '';
    const lastName = user.last_name?.trim() || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email || 'User';
  }, [user]);

  const email = user?.email || '';

  return (
    <ViewOnce
      type="slideUp"
      distance={20}
      duration={0.6}
      margin="-100px"
      className="bg-deep-maroon rounded-sm p-4 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-white text-lg font-semibold mb-1">
            {t('greeting', { name: displayName })}
          </h2>
          <p className="text-white/90 text-sm">{email}</p>
        </div>
        <Link
          href="/user/profile"
          className="flex flex-col items-center gap-1.5 text-white hover:text-white/80 transition-colors ml-4"
        >
          <FiEdit2 className="h-4 w-4" />
          <span className="text-sm font-medium">{t('edit')}</span>
        </Link>
      </div>
    </ViewOnce>
  );
};

export default UserProfileHeader;
