import { trpc } from "@/root/utils/trpc";
import PostsList from "@/root/components/PostsList";

function PostListingPage() {
  const {data, isLoading} = trpc.useQuery(['posts.posts'])

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