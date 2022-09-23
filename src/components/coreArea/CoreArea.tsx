import { ReactNode } from 'react';
import Link from "next/link";

import ProfileCard from "@/root/components/profileCard";
import AboutMe from "@/root/components/aboutMe";

const CoreArea = ({children}: { children: ReactNode }) => {
  return (
    <section className='grid gap-5 lg:grid-cols-3'>
      <section className='left-column rounded-xl space-y-5'>
        <ProfileCard/>
      </section>
      <section className='right-column rounded-xl space-y-5 lg:col-span-2'>
        <AboutMe/>
        <section className='actual-routes'>{children}</section>
      </section>
    </section>
  );
};

export default CoreArea;