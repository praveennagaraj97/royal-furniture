'use client';

import { useAuth } from '@/contexts/auth-context';
import { useUser } from '@/contexts/user-context';
import { useUserInitials } from '@/hooks/use-user-initials';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogIn,
  Route,
  ShoppingCart,
  Store,
  Truck,
  X,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, useMemo, useRef, useState } from 'react';

import logo from '@/assets/logo.png';
import { Subcategory } from '@/components/category/subcategories/card';
import { categories } from '@/temp/data/categories';
import { categoriesData, CategoriesData } from '@/temp/data/categories-data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, onSignIn }) => {
  const t = useTranslations('common');
  const tQuickLinks = useTranslations('quickLinks');
  const tCategories = useTranslations('categories');
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const { user, isLoading } = useUser();
  const userInitials = useUserInitials(user);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleCategoryClick = (categoryId: string) => {
    const categoryData = categoriesData[categoryId as keyof CategoriesData];
    if (categoryData && categoryData.length > 0) {
      setSelectedCategory(categoryId);
    }
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const getSubcategories = (): Subcategory[] => {
    if (!selectedCategory) return [];
    return categoriesData[selectedCategory as keyof CategoriesData] || [];
  };

  const quickLinks = [
    { labelKey: 'freeShipping', icon: Truck },
    { labelKey: 'clickAndCollect', icon: Store },
    { labelKey: 'trackOrder', icon: Route },
    { labelKey: 'storeLocator' },
    { labelKey: 'help' },
    { labelKey: 'sellWithUs' },
  ];

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

  const subcategories = getSubcategories();
  const isRTL = locale === 'ar';

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRTL ? 20 : -20 },
  };

  // Animation values based on RTL
  const menuInitialX = isRTL ? '100%' : '-100%';
  const menuExitX = isRTL ? '100%' : '-100%';
  const slideInX = isRTL ? -20 : 20;
  const slideOutX = isRTL ? 20 : -20;
  const categoriesSlideInX = isRTL ? 20 : -20;
  const categoriesSlideOutX = isRTL ? -20 : 20;

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

          {/* Menu Panel - Full width and height, slides from left to right (or right to left for RTL) */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 left-0 right-0 w-full h-screen bg-white z-50 lg:hidden shadow-lg flex flex-col"
            initial={{ x: menuInitialX }}
            animate={{ x: 0 }}
            exit={{ x: menuExitX }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header: Close, Language, Logo, Heart, Cart */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newLocale = locale === 'en' ? 'ar' : 'en';
                    router.replace(pathname, { locale: newLocale });
                  }}
                  className="text-sm text-gray-700 hover:text-[#7F1D1D] transition-colors"
                >
                  {locale === 'en' ? t('arabic') : t('english')}
                </button>
              </div>

              <Link href="/" onClick={onClose}>
                <Image
                  src={logo}
                  alt="Logo"
                  priority
                  quality={100}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-2">
                <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Sign Up / Sign In Buttons */}
              {!selectedCategory && (
                <motion.div
                  className="flex flex-col gap-2 mb-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {isLoading ? (
                    <div className="h-12 rounded-xl bg-gray-200 animate-pulse" />
                  ) : isAuthenticated && user ? (
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 bg-[#7F1D1D] text-white rounded-xl hover:bg-[#6B1919] transition-colors"
                      type="button"
                      onClick={() => {
                        router.push('/user');
                        onClose();
                      }}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7F1D1D] font-semibold text-xs">
                        {userInitials || 'U'}
                      </span>
                      <span className="text-base font-medium">
                        {getTruncatedDisplayName(displayName)}
                      </span>
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#7F1D1D] text-white rounded-xl hover:bg-[#6B1919] transition-colors"
                      type="button"
                      onClick={() => {
                        onSignIn();
                        onClose();
                      }}
                    >
                      <LogIn className="h-5 w-5" />
                      <span className="text-base font-medium">
                        {t('signInOrSignUp')}
                      </span>
                    </button>
                  )}
                </motion.div>
              )}

              {/* HR Line */}
              {!selectedCategory && <hr className="mb-4 border-gray-200" />}

              {/* Categories List */}
              <AnimatePresence mode="wait">
                {selectedCategory ? (
                  <motion.div
                    key={`subcategories-${selectedCategory}`}
                    className="flex flex-col"
                    initial={{ opacity: 0, x: slideInX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideOutX }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Back Button */}
                    <button
                      className="flex items-center gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200 mb-2"
                      type="button"
                      onClick={handleBackClick}
                    >
                      {isRTL ? (
                        <ArrowRight className="h-5 w-5" />
                      ) : (
                        <ArrowLeft className="h-5 w-5" />
                      )}
                      <span className="text-base font-medium">
                        {categories.find((c) => c.id === selectedCategory)
                          ? tCategories(
                              categories.find((c) => c.id === selectedCategory)
                                ?.key || ''
                            )
                          : t('back')}
                      </span>
                    </button>

                    {/* Subcategories */}
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        className="flex items-center gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] transition-colors border-b border-gray-200"
                        type="button"
                        onClick={() => {
                          router.push(`/${selectedCategory}/${subcategory.id}`);
                          onClose();
                        }}
                      >
                        <span className="text-base font-medium">
                          {subcategory.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="categories"
                    className="flex flex-col gap-1 mb-4"
                    initial={{ opacity: 0, x: categoriesSlideInX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: categoriesSlideOutX }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      {t('categories')}
                    </div>
                    {categories
                      .filter((cat) => cat.id !== 'all')
                      .map((category) => {
                        const hasSubcategories =
                          categoriesData[category.id as keyof CategoriesData] &&
                          categoriesData[category.id as keyof CategoriesData]
                            .length > 0;
                        return (
                          <button
                            key={category.id}
                            className="flex items-center justify-between gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] rounded-xl transition-colors"
                            type="button"
                            onClick={() => {
                              if (hasSubcategories) {
                                handleCategoryClick(category.id);
                              } else {
                                router.push(`/${category.id}`);
                                onClose();
                              }
                            }}
                          >
                            <span className="text-base font-medium">
                              {tCategories(category.key)}
                            </span>
                            {hasSubcategories &&
                              (isRTL ? (
                                <ChevronLeft className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              ))}
                          </button>
                        );
                      })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HR Line */}
              {!selectedCategory && <hr className="mb-4 border-gray-200" />}

              {/* Quick Links */}
              {!selectedCategory && (
                <motion.div
                  className="flex flex-col gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <motion.div key={link.labelKey} variants={itemVariants}>
                        {Icon ? (
                          <div className="flex items-center gap-2 px-1 py-2 text-sm text-gray-700">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="font-semibold">
                              {tQuickLinks(link.labelKey)}
                            </span>
                          </div>
                        ) : (
                          <a
                            href="#"
                            className="flex items-center gap-2 px-1 py-2 text-sm text-gray-700 hover:text-[#7F1D1D] transition-colors"
                          >
                            <span className="font-semibold">
                              {tQuickLinks(link.labelKey)}
                            </span>
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
