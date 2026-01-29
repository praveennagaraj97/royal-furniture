'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { FadeIn } from './animations';

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <FadeIn>
          <button
            onClick={scrollToTop}
            aria-label="Go to top"
            className="fixed bottom-6 right-6 z-999 rounded-full bg-deep-maroon p-3 shadow-2xl hover:bg-maroon-700
        transform hover:scale-110 transition-transform duration-300"
          >
            <FaChevronUp className="text-white w-5 h-5" />
          </button>
        </FadeIn>
      )}
    </AnimatePresence>
  );
}
