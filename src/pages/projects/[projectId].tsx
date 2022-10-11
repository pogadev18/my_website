import Error from 'next/error';
import { useSession } from 'next-auth/react';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { createSSGHelpers } from '@trpc/react/ssg';

import UpdateProjectForm from '@/root/components/updateProjectForm';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';

import { prisma } from '@/root/utils/prisma';
import { appRouter } from '@/root/server/routes/app.router';
import { createContextInner } from '@/root/server/createContext';
import { sanitisePrismaObject } from '@/root/utils/sanitizePrismaObject';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
  });

  const projectId = context?.params?.projectId as string;

  const project = await ssg.fetchQuery('projects.single-project', { projectId });
  sanitisePrismaObject(project);

  return {
    props: {
      project,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
    },
  });

  // generate pages at build time only for the first 5 projects
  const projectsToBeCached = projects.slice(0, 5);

  // this is used in order to know how many pages needs to be SSG
  const paths = projectsToBeCached.map((project: { id: string }) => ({
    params: {
      projectId: project.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

function SinglePostPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { project } = props;
  const { data: user } = useSession();

  if (!project) {
    return <Error statusCode={404} />;
  }

  const projectDefaultValues = {
    projectId: project.id,
    title: project?.title,
    body: project?.body,
    imageUrl: project?.imageUrl,
  };

  return (
    <PageWrapper>
      {user && <UpdateProjectForm projectId={project.id} defaultValues={projectDefaultValues} />}
      <h1>{project?.title}</h1>
      <p>{project?.body}</p>
    </PageWrapper>
  );
}

export default SinglePostPage;
