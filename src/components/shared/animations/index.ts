/**
 * Shared Animation Components
 *
 * Centralized animation components for consistent animations across the application.
 * All animations should use these components instead of inline framer-motion code.
 */

export { StaggerContainer } from './stagger-container';
export type { StaggerContainerProps } from './stagger-container';

export { StaggerItem } from './stagger-item';
export type {
  AnimationType,
  SlideDirection,
  StaggerItemProps,
} from './stagger-item';

export { SlideIn } from './slide-in';
export type { SlideInProps } from './slide-in';

export { FadeIn } from './fade-in';
export type { FadeInProps } from './fade-in';

export { ViewOnce } from './view-once';
export type { ViewOnceAnimationType, ViewOnceProps } from './view-once';

export { AnimatePresenceWrapper } from './animate-presence-wrapper';
export type {
  AnimatePresenceWrapperProps,
  PresenceMode,
} from './animate-presence-wrapper';

export { HeroBanner } from './hero-banner';
export type { HeroBannerProps } from './hero-banner';

export { ModalBackdrop } from './modal-backdrop';
export type { ModalBackdropProps } from './modal-backdrop';

export { ModalContent } from './modal-content';
export type { ModalContentProps, ModalVariant } from './modal-content';

export { RotateIcon } from './rotate-icon';
export type { RotateIconProps } from './rotate-icon';
