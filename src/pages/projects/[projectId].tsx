import Error from 'next/error'
import { useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createSSGHelpers } from "@trpc/react/ssg";

import UpdateProjectForm from "@/root/components/updateProjectForm";
import LoadingSpinner from "@/root/components/loadingSpinner";
import PageWrapper from "@/root/components/pageWrapper/PageWrapper";

import { trpc } from "@/root/utils/trpc";
import { prisma } from "@/root/utils/prisma";
import { appRouter } from "@/root/server/routes/app.router";
import { createContextInner } from "@/root/server/createContext";
import { useRouter } from "next/router";

export const getStaticProps = async (context: GetStaticPropsContext<{ projectId: string }>) => {
  try {
    const ssg = createSSGHelpers({
      router: appRouter,
      ctx: await createContextInner({session: null}),
    })

    const projectId = context?.params?.projectId as string;

    await ssg.fetchQuery('projects.single-project', {projectId});

    return {
      props: {
        projectId
      }
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: projects.map((project) => ({
      params: {
        projectId: project.id,
      },
    })),
    fallback: 'blocking',
  };
};

function SinglePostPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {projectId} = props;
  const {data: user} = useSession();
  const router = useRouter();


  const {data: project, status} = trpc.useQuery(['projects.single-project', {projectId}])

  if (status !== 'success') {
    // won't happen since we're using `fallback: "blocking"`
    return <LoadingSpinner/>
  }

  if (router.isFallback) {
    return <LoadingSpinner/>
  }

  if (!project) {
    return <Error statusCode={404}/>
  }

  const projectDefaultValues = {
    projectId,
    title: project?.title,
    body: project?.body
  }

  return (
    <PageWrapper>
      {user && <UpdateProjectForm projectId={projectId} defaultValues={projectDefaultValues}/>}
      <h1>{project?.title}</h1>
      <p>{project?.body}</p>
    </PageWrapper>
  )
}

export default SinglePostPage