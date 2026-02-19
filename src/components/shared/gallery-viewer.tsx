/* eslint-disable @next/next/no-img-element */
import Modal from '@/components/shared/modal';
import type { FC } from 'react';
import { startTransition, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
interface GalleryViewerProps {
  src: string;
  alt?: string;
  className?: string;
}
export const GalleryViewer: FC<GalleryViewerProps> = ({
  src,
  alt = '',
  className = '',
}) => {
  return (
    <div className="w-full aspect-video flex items-center justify-center bg-black/10">
      <img
        src={src}
        alt={alt}
        className={`max-w-full max-h-full object-contain ${className}`}
      />
    </div>
  );
};
interface GalleryViewerModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}
export const GalleryViewerModal: FC<GalleryViewerModalProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    startTransition(() => {
      if (isOpen) setIndex(initialIndex ?? 0);
    });
  }, [isOpen, initialIndex]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1));

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center" size="xl">
      <div className="relative bg-white p-4">
        {images[index] && (
          <GalleryViewer src={images[index]} alt={`Image ${index + 1}`} />
        )}

        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={onClose}
            className="p-1 bg-deep-maroon hover:bg-deep-maroon/90 rounded-full transition-colors"
          >
            <IoClose className="w-4 h-4 text-white" />
          </button>
        </div>

        {images.length > 1 && (
          <div className="absolute inset-y-0 left-2 flex items-center">
            <button
              type="button"
              onClick={prev}
              className="p-2 bg-white rounded-full"
            >
              Prev
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="button"
              onClick={next}
              className="p-2 bg-white rounded-full"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GalleryViewer;
