// import { createSSGHelpers } from '@trpc/react/ssg';
// import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ProjectsList from '@/root/components/projectsList/ProjectsList';
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
//   const projectsList = await ssg.fetchInfiniteQuery('projects.projects', { limit: 3 });
//   await sanitisePrismaObject(projectsList);
//
//
//   return {
//     props: {
//       projectsList,
//       // hasNextPage
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
        limit: 3,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    },
  );

  const fetchMore = () => fetchNextPage();

  return (
    <>
      <Head>
        <title>PogaDev | Projects</title>
      </Head>
      <section className="p-7 rounded-xl shadow mb-10 dark:bg-gray-800 dark:text-white">
        <div>
          <figure>
            <blockquote className="dark:bg-gray-900 dark:text-white">
              <p>
                You want first place come play with me, you want second place go somewhere else!
              </p>
            </blockquote>
            <figcaption className="text-xl italic">—Kobe Bryant</figcaption>
          </figure>
        </div>
      </section>
      <section className="dark:bg-gray-800 p-7 rounded-xl shadow">
        <h1 className="text-gray-700 font-bold mb-10 text-5xl dark:text-white">My Work</h1>

        {isLoading && <LoadingSpinner />}
        {projectsList &&
          projectsList.pages.map((data, idx) => (
            <section key={idx} className="my-5">
              <ProjectsList projects={data.projects} />
            </section>
          ))}

        {hasNextPage && (
          <section className="w-1/4 mx-auto flex justify-center my-10">
            <button
              onClick={fetchMore}
              className="transition ease-in-out hover:underline text-grey-darkest font-bold py-4 px-4 rounded inline-flex items-center"
            >
              <span>show me more</span>
              <svg
                className="w-6 h-6 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
              </svg>
            </button>
          </section>
        )}
      </section>
    </>
  );
}

export default ProjectsPage;
