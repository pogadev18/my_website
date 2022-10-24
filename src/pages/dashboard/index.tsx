import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';

import { requireAuth } from '@/root/common/requireAuth';
import ProjectForm from '@/root/components/projectForm/ProjectForm';
import UpdateUserInfoForm from '@/root/components/updateUserInfoForm';

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>PogaDev - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="flex gap-10">
          <h1 className="grow">Hello, {data?.user?.name}!</h1>
          <button
            className="basis-3/12 transition ease-in-out grow bg-red-600 hover:bg-red-800 py-2 px-10 rounded"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Logout
          </button>
        </header>

        <section className="my-5">
          <h3 className="text-2xl mb-5">Create project</h3>
          <ProjectForm />
          <hr className="my-10" />
        </section>
        <section className="my-5">
          <h3 className="text-2xl mb-5">Update personal info</h3>
          <UpdateUserInfoForm />
          <hr className="my-10" />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});

export default Dashboard;
