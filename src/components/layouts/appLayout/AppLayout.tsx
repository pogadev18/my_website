import { ReactNode } from 'react';

import Navbar from '@/root/components/navbar';

import styles from './AppLayout.module.scss';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className={`${styles.appLayout} mx-auto max-w-6xl px-3 md:px-0 rounded-xl`}>
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default AppLayout;
