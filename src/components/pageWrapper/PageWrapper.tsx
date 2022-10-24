import { ReactNode } from 'react';

import styles from './PageWrapper.module.scss';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`${styles.pageWrapper} my-10 shadow-md rounded-xl p-7 mx-auto max-w-6xl bg-white dark:bg-gray-800`}
    >
      {children}
    </section>
  );
};

export default PageWrapper;
