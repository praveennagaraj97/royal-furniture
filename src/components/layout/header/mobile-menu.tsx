'use client';

import { useAuth } from '@/contexts/auth-context';
import { useUser } from '@/contexts/user-context';
import { useUserInitials } from '@/hooks/use-user-initials';
import { useRouter } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, LogIn, MapPin, ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, ReactNode, useMemo } from 'react';

import logo from '@/assets/logo.png';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

interface MenuItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  highlight?: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, onSignIn }) => {
  const t = useTranslations('common');
  const { isAuthenticated } = useAuth();
  const { user, isLoading } = useUser();
  const userInitials = useUserInitials(user);
  const router = useRouter();

  const displayName = useMemo(() => {
    if (!user) return 'User';
    const firstName = user.first_name?.trim() || '';
    const lastName = user.last_name?.trim() || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email || 'User';
  }, [user]);

  const getTruncatedDisplayName = (name: string): string => {
    const maxLength = 20;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  const menuItems: MenuItem[] = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t('location'),
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: t('wishlist'),
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: t('cart'),
    },
  ];

  // Add auth menu item based on state
  if (isLoading) {
    menuItems.push({
      icon: <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />,
      label: '',
      highlight: true,
    });
  } else if (isAuthenticated && user) {
    menuItems.push({
      icon: (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#7F1D1D] font-semibold text-xs">
          {userInitials || 'U'}
        </span>
      ),
      label: getTruncatedDisplayName(displayName),
      onClick: () => {
        router.push('/user');
        onClose();
      },
      highlight: true,
    });
  } else {
    menuItems.push({
      icon: <LogIn className="h-5 w-5 text-white" />,
      label: t('signInOrSignUp'),
      onClick: () => {
        onSignIn();
        onClose();
      },
      highlight: true,
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 left-0 right-0 bg-white z-50 lg:hidden rounded-b-3xl shadow-lg"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="container mx-auto px-4 py-4">
              {/* Header: Logo + Close button */}
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={logo}
                  alt="Logo"
                  priority
                  quality={100}
                  className="h-8 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <motion.div
                className="flex flex-col gap-1 pb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {menuItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    {item.highlight && (
                      <hr className="mt-2 mb-4 border-gray-200" />
                    )}
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-xl transition-colors ${
                        item.highlight
                          ? 'bg-[#7F1D1D] text-white hover:bg-[#6B1919]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D]'
                      }`}
                      type="button"
                      onClick={item.onClick || onClose}
                    >
                      {item.icon}
                      <span className="text-base font-medium">
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
