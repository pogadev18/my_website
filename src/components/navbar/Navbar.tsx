import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { FaMoon, FaSun, FaGripLines } from 'react-icons/fa';
import styles from './Navbar.module.scss';

const navigation = [
  { name: 'Home', href: '/', url: '' },
  { name: 'Projects', href: '/projects', url: 'projects' },
];

const activeLink = (url: string, pathname: string): string | '' => {
  return pathname === `/${url}` ? styles.linkActive : '';
};

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);

  const handleMobileNavigation = () => {
    if (navbar) setNavbar(!navbar);
  };

  console.log(currentTheme);

  return (
    <nav className="my-5 lg:my-10 relative text-black dark:text-white rounded-xl dark:bg-gray-800 shadow">
      <div className="sm:px-7 px-4 py-4 sm:py-0 mx-auto md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between md:block">
            <Link href="/">
              <a>
                <h2 className={`${styles.logo} text-white font-bold relative top-1`}>
                  <span className="text-black dark:text-white">Poga</span>
                  <span className="text-red-700">Dev</span>
                </h2>
              </a>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black dark:text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <FaGripLines className="text-black dark:text-white" size="20px" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className="list-none items-center px-0 sm:px-6 justify-center space-y-5 md:flex md:space-x-3 md:space-y-0">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      role="button"
                      onClick={handleMobileNavigation}
                      tabIndex={-10}
                      className={`${styles.navLink} ${activeLink(`${item.url}`, router.pathname)}`}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}

              {navbar && (
                <div className="border-t pt-5 border-solid border-gray-500">
                  {currentTheme === 'dark' ? (
                    <button onClick={() => setTheme('light')} type="button">
                      <FaSun size="20px" />
                    </button>
                  ) : (
                    <button onClick={() => setTheme('dark')} type="button">
                      <FaMoon size="20px" />
                    </button>
                  )}
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.themeToggle}>
          {currentTheme === 'dark' ? (
            <button onClick={() => setTheme('light')} type="button">
              <FaSun />
            </button>
          ) : (
            <button onClick={() => setTheme('dark')} type="button">
              <FaMoon />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
