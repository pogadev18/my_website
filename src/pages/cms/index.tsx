import { UserContextProvider } from "@/root/context/user.context";
import { trpc } from "@/root/utils/trpc";


function CMSPage() {
  const {data, isLoading} = trpc.useQuery(['users.me']);

  if (isLoading) return <p>loading user...</p>
  return (
    <UserContextProvider value={data}>

      <p>cms page</p>
    </UserContextProvider>
  )
}

export default CMSPage;