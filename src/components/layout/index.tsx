import { FC, ReactNode } from 'react';
import QuickLinksBar from './quick-links-bar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <QuickLinksBar />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
