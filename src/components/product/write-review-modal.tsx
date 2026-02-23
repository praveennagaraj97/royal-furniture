'use client';

import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import Modal from '@/components/shared/modal';
import { reviewService } from '@/services/api/review-service';
import { ParsedAPIError } from '@/types';
import type { ReviewsData } from '@/types/response';
import Image from 'next/image';
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import { IoIosStar } from 'react-icons/io';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productSlug: string;
  productName?: string;
  productImage?: string;
  onSubmitted?: (nextData?: ReviewsData | null) => void;
}

export const WriteReviewModal: FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  productSlug,
  productName,
  productImage,
  onSubmitted,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFormValues, setHasFormValues] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const hasValues = rating > 0 || content.trim() !== '' || files.length > 0;
    setHasFormValues(hasValues);
  }, [rating, content, files.length]);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;
    setFiles((prev) => {
      const next = [...prev, ...selected];
      return next.slice(0, 4);
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!rating) {
      setError('Please select a rating to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await reviewService.createReview({
        product_slug: productSlug,
        rating,
        content: content.trim() || undefined,
        images: files,
      });

      setRating(0);
      setContent('');
      setFiles([]);
      onClose();
      onSubmitted?.();
    } catch (e) {
      const parserError = e as ParsedAPIError;
      const message =
        parserError?.generalError || 'Unable to submit review right now.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setContent('');
    setFiles([]);
    onClose();
  };

  const handleCloseAttempt = () => {
    if (hasFormValues) {
      setShowConfirmModal(true);
    } else {
      handleCancel();
    }
  };

  const handleConfirmDiscard = () => {
    setShowConfirmModal(false);
    setRating(0);
    setContent('');
    setFiles([]);
    setHasFormValues(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        variant="center"
        size="lg"
        preventClose={hasFormValues}
        onCloseAttempt={handleCloseAttempt}
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header with product info */}
          <div className="flex items-start gap-4">
            {productImage && (
              <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={productImage}
                  alt={productName || 'Product'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-lg md:text-xl font-semibold text-indigo-slate truncate">
                {productName || 'Write review'}
              </h2>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-indigo-slate">
              Your overall rating
            </p>
            <div className="flex items-center gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStarClick(value)}
                  className="text-yellow-500 focus:outline-none"
                >
                  <IoIosStar
                    className={`w-7 h-7 ${
                      value <= rating
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-indigo-slate">
              Add detailed review
            </p>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-deep-maroon focus:border-deep-maroon resize-vertical"
              placeholder="Share your experience with this product"
            />
          </div>

          {/* Images */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-indigo-slate">Add photo</p>
            <div className="flex flex-wrap gap-3">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="w-20 h-20 rounded-md border border-gray-200 overflow-hidden relative bg-gray-50"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {files.length < 4 && (
                <label className="w-20 h-20 rounded-md border border-dashed border-deep-maroon flex items-center justify-center text-deep-maroon text-xs cursor-pointer bg-white">
                  <span>+ Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-md border border-[#7D0707] px-4 py-2.5 text-sm font-medium text-[#7D0707] bg-white hover:bg-[#FFF5F4] transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[#7D0707] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5c0505] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDiscard}
        title="Discard your review?"
        message="You have unsaved changes in your review. Are you sure you want to close?"
        confirmText="Yes, close"
        cancelText="Continue editing"
        variant="warning"
      />
    </>
  );
};
