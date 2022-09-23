import { ReactNode } from 'react';
import Link from "next/link";

import ProfileCard from "@/root/components/profileCard";

const CoreArea = ({children}: { children: ReactNode }) => {
  return (
    <section className='flex gap-6'>
      <section className='left-column rounded-xl bg-slate-500 basis-1/3'>
        <ProfileCard/>
      </section>
      <section className='right-column bg-slate-700 grow'>
        <header>
          <ul>
            <li><Link href='/'>Resume</Link></li>
            <li><Link href='/projects'>Projects</Link></li>
            <li></li>
          </ul>
        </header>
        <section className='actual-routes'>{children}</section>
      </section>
    </section>
  );
};

export default CoreArea;