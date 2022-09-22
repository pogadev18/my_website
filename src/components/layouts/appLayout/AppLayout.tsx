import { ReactNode } from 'react';

import CoreArea from "@/root/components/coreArea";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({children}: AppLayoutProps) => {
  return (
    <>
      <section className='appLayout mx-auto max-w-6xl'>
        <CoreArea children={children}/>
      </section>
    </>
  );
};

export default AppLayout;
