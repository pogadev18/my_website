import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import LoginForm from '@/root/components/loginForm';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';

const AccessContent: NextPage = () => {
  return (
    <PageWrapper>
      <Head>
        <title>PogaDev - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSessionToken = context.req.cookies['next-auth.session-token'];

  if (userSessionToken) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AccessContent;
