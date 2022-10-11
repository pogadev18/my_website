// import { createSSGHelpers } from '@trpc/react/ssg';
// import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ProjectsList from '@/root/components/projectsList/ProjectsList';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
// import { appRouter } from '@/root/server/routes/app.router';
// import { createContextInner } from '@/root/server/createContext';
// import { sanitisePrismaObject } from '@/root/utils/sanitizePrismaObject';
import { trpc } from '@/root/utils/trpc';
import LoadingSpinner from '@/root/components/loadingSpinner';

// export const getStaticProps = async () => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContextInner({ session: null }),
//   });
//
//   const projectsList = await ssg.fetchQuery('projects.projects');
//   await sanitisePrismaObject(projectsList);
//
//   return {
//     props: {
//       projectsList,
//     },
//     revalidate: 30,
//   };
// };

function ProjectsPage() {
  const {
    data: projectsList,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = trpc.useInfiniteQuery(
    [
      'projects.projects',
      {
        limit: 6,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    },
  );

  const fetchMore = () => fetchNextPage();

  return (
    <PageWrapper>
      <Head>
        <title>PogaDev | Projects</title>
      </Head>
      <h1 className="my-12 text-gray-700 uppercase font-extrabold text-5xl">Work showcase</h1>
      {isLoading && <LoadingSpinner />}
      {projectsList &&
        projectsList.pages.map((data) => (
          <ProjectsList key={data.nextCursor} projects={data.projects} />
        ))}
      {hasNextPage && (
        <button type="button" onClick={fetchMore}>
          next posts
        </button>
      )}
    </PageWrapper>
  );
}

export default ProjectsPage;
