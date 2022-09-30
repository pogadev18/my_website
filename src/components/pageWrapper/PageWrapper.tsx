import { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="mx-auto max-w-6xl">{children}</section>;
};

export default PageWrapper;
