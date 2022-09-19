import type { AppProps } from 'next/app'
import { withTRPC } from "@trpc/next";
import superjson from 'superjson';

import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppRouter } from "@/root/server/routes/app.router";
import { url } from "@/root/constants/url";
import { trpc } from '@/root/utils/trpc';
import { UserContextProvider } from "@/root/context/user.context";

import '@/root/styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
  const {data, isLoading} = trpc.useQuery(['users.me']);

  if (isLoading) return <p>Loading user...</p>

  // todo: change how you use the user provider, you want your users to be able to see the website
  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
        <ReactQueryDevtools/>
      </main>
    </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ctx}) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60 // re-fetch queries after this time expires
          }
        }
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1', // requests are done on the server
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false // tweak this if you want to use SSR or if you think is necessary
})(MyApp);
