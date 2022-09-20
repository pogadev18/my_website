import dynamic from "next/dynamic";

import { UserContextProvider } from "@/root/context/user.context";
import { trpc } from "@/root/utils/trpc";

const LoginForm = dynamic(() => import('@/root/components/LoginForm'), {
  ssr: false
})

function LoginPage() {
  const {data, isLoading} = trpc.useQuery(['users.me']);

  if (isLoading) return <p>loading users...</p>

  console.log('users in DB >>>', data);

  return (
    <UserContextProvider value={data}>
      <LoginForm/>
    </UserContextProvider>
  )
}

export default LoginPage;