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
    <ul className={`${styles.navWrapper} flex space-x-5`}>
      <li>
        <Link href="/">
          <a
            role="button"
            tabIndex={-10}
            className={`${styles.navLink} ${activeLink('', router.pathname)}`}
          >
            Resume
          </a>
        </Link>
      </li>
      <li>
        <Link href="/projects">
          <a
            role="button"
            tabIndex={-10}
            className={`${styles.navLink} ${activeLink('projects', router.pathname)}`}
          >
            Projects
          </a>
        </Link>
      </li>
      {user && (
        <li>
          <Link href="/dashboard">
            <a
              role="button"
              tabIndex={-10}
              className={`${styles.navLink} ${activeLink('dashboard', router.pathname)}`}
            >
              Dashboard
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
