import type { NextPage } from 'next';
import Head from 'next/head';

import PageWrapper from '@/root/components/pageWrapper/PageWrapper';

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Head>
        <title>PogaDev | Resume</title>
      </Head>
      <h1>Resume page</h1>
      <p>resume details</p>
    </PageWrapper>
  );
};

export default Home;
