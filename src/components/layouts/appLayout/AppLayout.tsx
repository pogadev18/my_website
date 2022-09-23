import { ReactNode } from 'react';

import CoreArea from "@/root/components/coreArea";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({children}: AppLayoutProps) => {
  return (
    <>
      <main className='appLayout mx-auto max-w-6xl py-10'>
        <CoreArea children={children}/>
      </main>
    </>
  );
};

export default AppLayout;
