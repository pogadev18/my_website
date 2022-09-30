import { withTRPC } from "@trpc/next";
import superjson from 'superjson';
import { SessionProvider } from "next-auth/react";
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppRouter } from "@/root/server/routes/app.router";
import AppLayout from "@/root/components/layouts/appLayout";
import { url } from "@/root/constants/url";

import '@/root/styles/globals.css';

function MyApp({Component, pageProps}: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppLayout/>
      <Component {...pageProps} />
      <ReactQueryDevtools/>
    </SessionProvider>
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
            staleTime: 86400000 // re-fetch queries after this time expires -> 24h
          }
        }
      },
      // headers() {
      //   if (ctx?.req) {
      //     return {
      //       ...ctx.req.headers,
      //       'x-ssr': '1', // inform server that it's an SSR request
      //     }
      //   }
      //   return {}
      // },
      links,
      transformer: superjson,
    }
  },
  ssr: false // Whether tRPC should await queries when server-side rendering a page
})(MyApp);
