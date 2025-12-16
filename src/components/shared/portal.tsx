'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  blurBackdrop?: boolean;
  containerId?: string;
}

const generateRandomId = (length = 8): string => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  }
  return result;
};

const Portal: FC<PortalProps> = ({
  children,
  blurBackdrop = false,
  containerId,
}) => {
  const idRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // Generate ID only when needed (in effect, not during render)
    if (!idRef.current) {
      idRef.current = containerId || `portal-${generateRandomId()}`;
    }

    const id = containerId || idRef.current;
    let portalContainer = document.getElementById(id) as HTMLDivElement;

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = id;
      document.body.appendChild(portalContainer);
    }

    // Only update state if container changed
    if (containerRef.current !== portalContainer) {
      containerRef.current = portalContainer;
      queueMicrotask(() => {
        setContainer(portalContainer);
      });
    }

    return () => {
      if (portalContainer && portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, [containerId]);

  if (!container || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={blurBackdrop ? 'backdrop-blur-sm' : ''}>{children}</div>,
    container
  );
};

export default Portal;
