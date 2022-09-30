import { createSSGHelpers } from '@trpc/react/ssg';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ProjectsList from '@/root/components/projectsList/ProjectsList';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import { appRouter } from '@/root/server/routes/app.router';
import { createContextInner } from '@/root/server/createContext';
import { sanitisePrismaObject } from '@/root/utils/sanitizePrismaObject';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const ssg = createSSGHelpers({
      router: appRouter,
      ctx: await createContextInner({ session: null }),
    });

    const projectsList = await ssg.fetchQuery('projects.projects');
    await sanitisePrismaObject(projectsList);

    return {
      props: {
        projectsList,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

function ProjectsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { projectsList } = props;

  return (
    <PageWrapper>
      <Head>
        <title>PogaDev | Projects</title>
      </Head>
      {projectsList && <ProjectsList projects={projectsList} />}
    </PageWrapper>
  );
}

export default ProjectsPage;
