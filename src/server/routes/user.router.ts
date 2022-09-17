import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';

import { createRouter } from "@/root/server/createRouter";
import { createUserSchema, requestOPTSchema } from "@/root/schema/user.schema";

import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/root/constants/errorCodes";
import { errorMessages } from "@/root/constants/errorMessages";

export const userRouter = createRouter()
  .mutation('register-user', {
    input: createUserSchema,
    async resolve({ctx, input}) {
      const {name, email} = input;

      try {
        return await ctx.prisma.user.create({
          data: {
            name,
            email
          }
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          // validation of unique constraint
          if (error.code === 'P2002') {
            throw new trpc.TRPCError({
              code: CONFLICT,
              message: errorMessages.userAlreadyExists
            })
          }
        }

        throw new trpc.TRPCError({
          code: INTERNAL_SERVER_ERROR,
          message: errorMessages.somethingWentWrong
        })
      }
    }
  })
  .mutation('request-otp', {
    input: requestOPTSchema,
    async resolve({ctx, input}) {
      const {email, redirect} = input;

      const user = await ctx.prisma.user.findUnique({
        where: {email}
      })

      if (!user) {
        throw new trpc.TRPCError({
          code: NOT_FOUND,
          message: errorMessages.userNotFound
        })
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id
            }
          }
        }
      })

      // send email

      return true;
    }
  })