import { createRouter } from "../createRouter";
import { userRouter } from "@/root/server/routes/user.router";
import {postRouter} from "@/root/server/routes/post.router";

export const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('posts.', postRouter)


export type AppRouter = typeof appRouter;