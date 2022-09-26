import { trpc } from "@/root/utils/trpc";

import ProjectsList from "@/root/components/projectsList/ProjectsList";

function PostListingPage() {
  // TODO: SSR Query
  const {data: projects, isLoading} = trpc.useQuery(['projects.projects'])

  if (isLoading) {
    return <p>Loading projects...</p>
  }

  return (
    <>
      {projects && <ProjectsList projects={projects}/>}
    </>
  )
}

export default PostListingPage