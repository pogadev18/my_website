import { ReactNode } from 'react';
import Link from "next/link";

const CoreArea = ({children}: { children: ReactNode }) => {
  return (
    <main className='core-area'>
      <section className='left-column'>left column</section>
      <section className='right-column'>
        <header>
          <ul>
            <li><Link href='/'>Resume</Link></li>
            <li><Link href='/projects'>Projects</Link></li>
            <li></li>
          </ul>
        </header>
        <section className='actual-routes'>{children}</section>
      </section>
    </main>
  );
};

export default CoreArea;