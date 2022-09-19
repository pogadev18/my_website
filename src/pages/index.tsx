import type { NextPage } from 'next'
import Link from "next/link";

import { trpc } from "@/root/utils/trpc";
import PostsList from "@/root/components/PostsList";

// import { useUserContext } from "@/root/context/user.context";
// import LoginForm from "@/root/components/LoginForm";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(['posts.posts'])

  // const user = useUserContext();

  // if (!user) return <LoginForm/>

  return (
    <div>
      <h1>Home page</h1>
      {isLoading && <p>loading posts...</p>}
      {data &&
        (
          <>
            <PostsList posts={data}/>
            <Link href='/posts'>see all projects</Link>
          </>
        )
      }
    </div>
  )
}

export default Home
