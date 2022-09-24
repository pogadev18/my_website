import * as trpc from '@trpc/server';

import { FORBIDDEN } from "@/root/constants/errorCodes";
import { errorMessages } from "@/root/constants/errorMessages";
import { createRouter } from "@/root/server/createRouter";
import { postSchema, singlePostSchema, updateProjectSchema } from "@/root/schema/post.schema";

export const postRouter = createRouter()
  .mutation('create-project', {
    input: postSchema,
    async resolve({ctx, input}) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: FORBIDDEN,
          message: errorMessages.postUpdateDenied
        })
      }

      return await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              // @ts-ignore
              id: ctx.session?.id
            }
          }
        },
      })

    },
  })
  .mutation('update-project', {
    input: updateProjectSchema,
    async resolve({ctx, input}) {
      const {projectId, title, body} = input;

      if (!ctx.session) {
        new trpc.TRPCError({
          code: FORBIDDEN,
          message: errorMessages.postUpdateDenied
        })
      }

      return await ctx.prisma.post.update({
        where: {id: projectId},
        data: {title, body}
      })
    }
  })
  .mutation('delete-project', {
    input: singlePostSchema,
    async resolve({ctx, input}) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: FORBIDDEN,
          message: errorMessages.postUpdateDenied
        })
      }

      return await ctx.prisma.post.delete({
        where: {id: input.projectId},
      })
    }
  })
  .query('projects', {
    resolve({ctx}) {
      return ctx.prisma.post.findMany()
    },
  })
  .query('single-project', {
    input: singlePostSchema,
    resolve({input, ctx}) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.projectId,
        },
      })
    },
  })