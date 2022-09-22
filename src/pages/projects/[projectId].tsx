import Error from 'next/error'
import { useRouter } from 'next/router'

import { trpc } from "@/root/utils/trpc";

function SinglePostPage() {
  const router = useRouter()

  const projectId = router.query.projectId as string

  const {data: project, isLoading} = trpc.useQuery(['projects.single-post', {projectId}])

  if (isLoading) {
    return <p>Loading post...</p>
  }

  if (!project) {
    return <Error statusCode={404}/>
  }

  return (
    <div>
      <h1>{project?.title}</h1>
      <p>{project?.body}</p>
    </div>
  )
}

export default SinglePostPage