'use client';

import { useClickOutside } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

/**
 * Interface for the select option structure
 */
export interface SelectOption {
  label: ReactNode;
  value: string | number;
  href?: string;
}

/**
 * Props for the Select component
 */
interface SelectProps {
  label?: string;
  value?: string | number;
  options: SelectOption[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  customBaseClassName?: string;
  customPanelWidth?: string | number;
}

/**
 * A custom Select component that behaves like an HTML select tag
 * but with the styling and animations of the Dropdown component.
 */
export const Select: FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error,
  showError = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  disabled = false,
  id,
  customBaseClassName,
  customPanelWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  // Close the dropdown when clicking outside
  useClickOutside({
    ref: containerRef,
    handler: () => setIsOpen(false),
    enabled: isOpen,
  });

  // Calculate and update the position of the dropdown panel
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePosition = () => {
      if (!containerRef.current) return;

      const triggerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const padding = 16;
      const gap = 4;

      // Get panel height (estimate if not yet rendered)
      const panelHeight = dropdownRef.current?.offsetHeight || 240;

      const left = triggerRect.left;
      let top = triggerRect.bottom + gap;
      const width = triggerRect.width;

      const spaceBelow = viewportHeight - triggerRect.bottom - gap - padding;
      const spaceAbove = triggerRect.top - gap - padding;

      // Position above if there isn't enough space below
      if (spaceBelow < panelHeight && spaceAbove > spaceBelow) {
        top = triggerRect.top - Math.min(panelHeight, spaceAbove) - gap;
      }

      setPanelPosition({ top, left, width });
    };

    // Initial positioning
    updatePosition();

    // Recalculate once panel is rendered to get accurate dimensions
    const rafId = requestAnimationFrame(updatePosition);

    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  // Handle keyboard interaction
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const hasError = showError && error;

  return (
    <div className={`relative ${containerClassName}`} ref={containerRef}>
      {label && (
        <label htmlFor={id} className={`form-input-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`${
          customBaseClassName || 'form-input-base'
        } flex items-center justify-between transition-all duration-200 ${
          hasError
            ? 'form-input-border-error'
            : !customBaseClassName
            ? 'form-input-border-default'
            : ''
        } ${
          disabled
            ? 'opacity-50 cursor-not-allowed bg-gray-50'
            : 'cursor-pointer hover:border-gray-400'
        } ${className}`}
      >
        <span
          className={`block truncate ${
            selectedOption ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-red-500 mt-1">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="fixed z-100"
            role="listbox"
            style={
              panelPosition
                ? {
                    top: `${panelPosition.top}px`,
                    left: `${panelPosition.left}px`,
                    width: customPanelWidth || `${panelPosition.width}px`,
                  }
                : { visibility: 'hidden' }
            }
          >
            <div className="max-h-60 overflow-auto rounded-lg bg-white py-1 shadow-xl ring-1 ring-black/5">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = value === option.value;
                  const itemClassName = `w-full px-4 py-2.5 text-start text-sm transition-colors hover:bg-gray-50 flex items-center justify-between ${
                    isSelected
                      ? 'bg-pale-blush text-deep-maroon font-medium'
                      : 'text-gray-700'
                  }`;

                  const content = (
                    <>
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <span className="text-deep-maroon text-xs ml-2">✓</span>
                      )}
                    </>
                  );

                  if (option.href) {
                    return (
                      <Link
                        key={option.value}
                        href={option.href}
                        className={itemClassName}
                        onClick={() => setIsOpen(false)}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={itemClassName}
                    >
                      {content}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-4 text-sm text-gray-400 text-center">
                  No options available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
