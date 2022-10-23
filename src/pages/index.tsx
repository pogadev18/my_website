import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import JobCard from '@/root/components/jobCard';
import { jobs } from '@/root/constants/mockedJobs';
import { useEffect } from 'react';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      jobs,
    },
  };
};

function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { jobs } = props;

  return (
    <PageWrapper>
      <Head>
        <title>PogaDev | Resume</title>
      </Head>
      <h1 className="text-gray-700 font-bold mb-10 text-5xl">Resume</h1>
      <section>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </PageWrapper>
  );
}

export default Home;
