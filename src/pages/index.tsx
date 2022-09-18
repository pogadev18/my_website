import type { NextPage } from 'next'

import { trpc } from "@/root/utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading, error} = trpc.useQuery(['users.me'])

  if (isLoading) return <p>loading...</p>

  return (
    <div>
      <h1>Home</h1>
      {error ? <p>{JSON.stringify(error)}</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Home
