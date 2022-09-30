import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession, Session } from 'next-auth';

import { prisma } from '@/root/utils/prisma';
import { nextAuthOptions } from '@/root/common/auth';
import { NextApiRequest, NextApiResponse } from 'next';

/** Use this helper for:
 * - testing, where we don't have to Mock Next.js req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/

type CreateContextOptions = {
  session: Session | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  return createContextInner({
    session,
  });
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
