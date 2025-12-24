import type { User } from '@/types/response';
import { useMemo } from 'react';

/**
 * Hook to extract user initials from display name
 * @param user - User object with display_name property
 * @returns User initials string or null if display_name is not available
 *
 * Logic:
 * - Single name: returns first 2 characters (e.g., "John" -> "JO")
 * - Multiple names: returns first char of first and last name (e.g., "John Doe" -> "JD")
 */
export const useUserInitials = (user: User | null | undefined): string | null => {
  return useMemo(() => {
    if (!user?.display_name) return null;

    const nameParts = user.display_name.trim().split(/\s+/);
    if (nameParts.length === 0) return null;

    if (nameParts.length === 1) {
      // Single name - take first 2 characters
      return nameParts[0].substring(0, 2).toUpperCase();
    }

    // Multiple names - take first character of first and last name
    const firstInitial = nameParts[0][0]?.toUpperCase() || '';
    const lastInitial = nameParts[nameParts.length - 1][0]?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }, [user?.display_name]);
};

