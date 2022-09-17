import type { NextPage } from 'next'

import { trpc } from "@/root/utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(['hello'])

  return (
    <div>
      {isLoading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Home
