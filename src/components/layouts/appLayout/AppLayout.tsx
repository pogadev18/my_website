import { ReactNode } from 'react';

import Header from '@/root/components/header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</section>
    </>
  );
};

export default AppLayout;
