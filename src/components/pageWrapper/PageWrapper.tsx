import { ReactNode } from 'react';

import styles from './PageWrapper.module.scss';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className={`${styles.pageWrapper} rounded-xl mx-auto max-w-6xl mt-10`}>
      {children}
    </section>
  );
};

export default PageWrapper;
