import { trpc } from "@/root/utils/trpc";
import PostsList from "@/root/components/postsList/PostsList";

function PostListingPage() {
  // TODO: SSR Query
  const {data, isLoading} = trpc.useQuery(['projects.projects'])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  return (
    <div>
      {data && <PostsList posts={data}/>}
    </div>
  )
}

export default PostListingPage