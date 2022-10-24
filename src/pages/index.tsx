import Head from 'next/head';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { createSSGHelpers } from '@trpc/react/ssg';

import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import JobCard from '@/root/components/jobCard';
import MyInfo from '@/root/components/coreArea';

import { appRouter } from '@/root/server/routes/app.router';
import { createContextInner } from '@/root/server/createContext';

import { jobs } from '@/root/constants/mockedJobs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
  });

  const user = await ssg.fetchQuery('users.me');

  return {
    props: {
      jobs,
      user,
    },
  };
};

function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { jobs, user } = props;

  return (
    <PageWrapper>
      <Head>
        <title>PogaDev | Resume</title>
      </Head>
      <MyInfo user={user} />

      <section className="dark:bg-gray-800 p-7 rounded-xl shadow">
        <h1 className="text-gray-700 dark:text-white font-bold mb-10 text-5xl">Resume</h1>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </PageWrapper>
  );
}

export default Home;
