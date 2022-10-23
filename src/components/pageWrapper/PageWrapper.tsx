import { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="my-10 shadow-md rounded-xl p-7 mx-auto max-w-6xl">{children}</section>;
};

export default PageWrapper;
