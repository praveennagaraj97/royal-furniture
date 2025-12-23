import { BackLink } from '@/components/shared/ui/back-link';
import UserLayout from '@/components/user/layout';
import type { ReactNode } from 'react';

interface UserLayoutPageProps {
  children: ReactNode;
}

export default function UserLayoutPage({ children }: UserLayoutPageProps) {
  return (
    <>
      <BackLink />
      <UserLayout>{children}</UserLayout>
    </>
  );
}
