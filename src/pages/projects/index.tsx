import { trpc } from "@/root/utils/trpc";

import Container from "@/root/components/container";
import ProjectsList from "@/root/components/projectsList/ProjectsList";

function PostListingPage() {
  // TODO: SSR Query
  const {data: projects, isLoading} = trpc.useQuery(['projects.projects'])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  return (
    <Container>
      {projects && <ProjectsList projects={projects}/>}
    </Container>
  )
}

export default PostListingPage