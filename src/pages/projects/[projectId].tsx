import Error from 'next/error'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";

import { trpc } from "@/root/utils/trpc";
import UpdateProjectForm from "@/root/components/updateProjectForm";
import LoadingSpinner from "@/root/components/loadingSpinner";

function SinglePostPage() {
  const router = useRouter()
  const {data: user} = useSession();

  const projectId = router.query.projectId as string

  // TODO: SSR Query
  const {data: project, isLoading: fetchingPost} = trpc.useQuery(['projects.single-project', {projectId}])

  if (fetchingPost) {
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
    <div>
      {user &&  <UpdateProjectForm projectId={projectId} defaultValues={projectDefaultValues}/>}
      <h1>{project?.title}</h1>
      <p>{project?.body}</p>
    </div>
  )
}

export default SinglePostPage