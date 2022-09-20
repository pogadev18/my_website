import * as trpc from '@trpc/server';

import { FORBIDDEN } from "@/root/constants/errorCodes";
import { errorMessages } from "@/root/constants/errorMessages";
import { createRouter } from "@/root/server/createRouter";
import { createPostSchema, getSinglePostSchema } from "@/root/schema/post.schema";

export const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: FORBIDDEN,
          message: errorMessages.postCreationDenied
        })
      }

      return await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user?.id
            },
          },
        },
      })

    },
  })
  .query('posts', {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany()
    },
  })
  .query('single-post', {
    input: getSinglePostSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      })
    },
  })