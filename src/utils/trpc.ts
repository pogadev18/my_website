import { createReactQueryHooks } from '@trpc/react';

import { AppRouter } from "@/root/server/routes/app.router";

export const trpc = createReactQueryHooks<AppRouter>();