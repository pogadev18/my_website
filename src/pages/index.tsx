import type { NextPage } from 'next'

import { useUserContext } from "@/root/context/user.context";
import LoginForm from "@/root/components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUserContext();

  if (!user) return <LoginForm/>

  return (
    <div>
      <Link href='/posts/new'>Create post</Link>
    </div>
  )
}

export default Home
