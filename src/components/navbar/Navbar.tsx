import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import styles from './Navbar.module.scss';

const activeLink = (url: string, pathname: string): string | '' => {
  return pathname === `/${url}` ? styles.linkActive : '';
};

const Navbar = () => {
  const router = useRouter();
  const { data: user } = useSession();

  return (
    <section className={`${styles.navWrapper} flex space-x-5`}>
      <div>
        <Link href="/">
          <a
            role="button"
            tabIndex={-10}
            className={`${styles.navLink} ${activeLink('', router.pathname)}`}
          >
            Resume
          </a>
        </Link>
      </div>
      <div>
        <Link href="/projects">
          <a
            role="button"
            tabIndex={-10}
            className={`${styles.navLink} ${activeLink('projects', router.pathname)}`}
          >
            Projects
          </a>
        </Link>
      </div>
      {user && (
        <div>
          <Link href="/dashboard">
            <a
              role="button"
              tabIndex={-10}
              className={`${styles.navLink} ${activeLink('dashboard', router.pathname)}`}
            >
              Dashboard
            </a>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navbar;
