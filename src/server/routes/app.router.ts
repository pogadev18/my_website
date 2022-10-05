import { createRouter } from '../createRouter';
import { userRouter } from '@/root/server/routes/user.router';
import { projectRouter } from '@/root/server/routes/project.router';

export const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('projects.', projectRouter);

export type AppRouter = typeof appRouter;
