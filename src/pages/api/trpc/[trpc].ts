import * as trpcNext from '@trpc/server/adapters/next';

import { appRouter } from "@/root/server/routes/app.router";
import { createContext } from "@/root/server/createContext";
import { INTERNAL_SERVER_ERROR } from "@/root/constants/errorCodes";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  // custom error handler
  onError({error}) {
    // what it's defined here is going to be sent to the client
    if (error.code === INTERNAL_SERVER_ERROR) {
      console.error('something went wrong', error)
    } else {
      console.error(error)
    }
  }
});