import { createRouter } from "../createRouter";
import { userRouter } from "@/root/server/routes/user.router";

export const appRouter = createRouter()
  .merge('users.', userRouter)


export type AppRouter = typeof appRouter;