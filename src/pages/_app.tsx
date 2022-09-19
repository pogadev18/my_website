import type { AppProps } from 'next/app'
import { withTRPC } from "@trpc/next";
import superjson from 'superjson';

import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppRouter } from "@/root/server/routes/app.router";
import { url } from "@/root/constants/url";

import '@/root/styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
      <ReactQueryDevtools/>
    </main>
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
            staleTime: 86400000 // re-fetch queries after this time expires
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
