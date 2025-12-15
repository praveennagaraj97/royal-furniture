import { FC, ReactNode } from 'react';
import Header from './header';
import QuickLinksBar from './quick-links-bar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <QuickLinksBar />
      <Header />
      <hr className="text-gray-200 w-full container mx-auto" />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
