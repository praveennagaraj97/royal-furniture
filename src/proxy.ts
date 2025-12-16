import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Since English uses root (/), we only need to match root and /ar paths
  matcher: ['/', '/(ar)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
