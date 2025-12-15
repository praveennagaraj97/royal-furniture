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
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
