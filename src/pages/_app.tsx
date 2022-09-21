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
    <main>
      <AppLayout>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
          <ReactQueryDevtools/>
        </SessionProvider>
      </AppLayout>
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
            staleTime: 86400000 // re-fetch queries after this time expires -> 24h
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
