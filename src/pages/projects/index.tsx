import { createSSGHelpers } from '@trpc/react/ssg';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ProjectsList, { IProject } from '@/root/components/projectsList/ProjectsList';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import { appRouter } from '@/root/server/routes/app.router';
import { createContextInner } from '@/root/server/createContext';
import { sanitisePrismaObject } from '@/root/utils/sanitizePrismaObject';

export const getStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
  });

  const projectsList: IProject[] = await ssg.fetchQuery('projects.projects');
  await sanitisePrismaObject(projectsList);

  return {
    props: {
      projectsList,
    },
  };
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
