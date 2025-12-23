'use client';

import { useClickOutside } from '@/hooks/use-click-outside';
import {
  AE,
  BH,
  DZ,
  EG,
  IN,
  IQ,
  JO,
  KW,
  LB,
  LY,
  MA,
  OM,
  PS,
  QA,
  SA,
  SD,
  SY,
  TN,
  YE,
} from 'country-flag-icons/react/3x2';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { type ComponentType, type FC, useRef, useState } from 'react';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
}

// Flag component mapping
const FLAG_COMPONENTS = {
  AE,
  SA,
  KW,
  QA,
  BH,
  OM,
  JO,
  LB,
  IQ,
  SY,
  YE,
  EG,
  MA,
  DZ,
  TN,
  LY,
  SD,
  PS,
  IN,
} as Record<string, ComponentType<Record<string, unknown>>>;

// Arab countries list with UAE as default, India at the end
const COUNTRIES: Country[] = [
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973' },
  { code: 'OM', name: 'Oman', dialCode: '+968' },
  { code: 'JO', name: 'Jordan', dialCode: '+962' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964' },
  { code: 'SY', name: 'Syria', dialCode: '+963' },
  { code: 'YE', name: 'Yemen', dialCode: '+967' },
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'MA', name: 'Morocco', dialCode: '+212' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216' },
  { code: 'LY', name: 'Libya', dialCode: '+218' },
  { code: 'SD', name: 'Sudan', dialCode: '+249' },
  { code: 'PS', name: 'Palestine', dialCode: '+970' },
  { code: 'IN', name: 'India', dialCode: '+91' },
];

interface CountryPickerProps {
  value: string;
  onChange: (dialCode: string) => void;
  defaultCountry?: string;
  className?: string;
}

export const CountryPicker: FC<CountryPickerProps> = ({
  value,
  onChange,
  defaultCountry = '+971',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    handler: () => {
      if (isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    },
    enabled: isOpen,
  });

  const selectedCountry =
    COUNTRIES.find((country) => country.dialCode === value) ||
    COUNTRIES.find((country) => country.dialCode === defaultCountry) ||
    COUNTRIES[0];

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  const handleSelect = (country: Country) => {
    onChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 bg-[#f8f8f8] border 
          rounded-lg focus:outline-none transition-colors 
           w-fit text-gray-900 form-input-border-default ${className}`}
      >
        <span>{selectedCountry.dialCode}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input-base w-full pl-9! pr-3 border-deep-maroon focus:ring-deep-maroon focus:border-deep-maroon"
                  autoFocus
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <motion.button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                      selectedCountry.code === country.code
                        ? 'bg-burgundy/5'
                        : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.02 }}
                  >
                    <div className="shrink-0 w-6 h-4">
                      {(() => {
                        const FlagComponent = FLAG_COMPONENTS[country.code];
                        if (!FlagComponent) return null;
                        return (
                          <FlagComponent className="w-full h-full object-cover rounded" />
                        );
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {country.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {country.dialCode}
                      </p>
                    </div>
                    {selectedCountry.code === country.code && (
                      <span className="text-deep-maroon text-sm">✓</span>
                    )}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
