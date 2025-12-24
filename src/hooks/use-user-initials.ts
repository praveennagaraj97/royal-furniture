import type { User } from '@/types/response';
import { useMemo } from 'react';

/**
 * Hook to extract user initials from first_name and last_name
 * @param user - User object with first_name and last_name properties
 * @returns User initials string or null if names are not available
 *
 * Logic:
 * - Both first and last name: returns first char of each (e.g., "John Doe" -> "JD")
 * - Only first name: returns first 2 characters (e.g., "John" -> "JO")
 * - Only last name: returns first 2 characters (e.g., "Doe" -> "DO")
 * - No names: returns null
 */
export const useUserInitials = (
  user: User | null | undefined
): string | null => {
  return useMemo(() => {
    if (!user) return null;

    const firstName = user.first_name?.trim() || '';
    const lastName = user.last_name?.trim() || '';

    if (firstName && lastName) {
      // Both names - take first character of each
      const firstInitial = firstName[0]?.toUpperCase() || '';
      const lastInitial = lastName[0]?.toUpperCase() || '';
      return `${firstInitial}${lastInitial}`;
    }

    if (firstName) {
      // Only first name - take first 2 characters
      return firstName.substring(0, 2).toUpperCase();
    }

    if (lastName) {
      // Only last name - take first 2 characters
      return lastName.substring(0, 2).toUpperCase();
    }

    // No names available
    return null;
  }, [user]);
};
