import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { serialize } from "cookie";

import { createRouter } from "@/root/server/createRouter";
import { createUserSchema, requestOPTSchema, verifyOTPSchema } from "@/root/schema/user.schema";

import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, FORBIDDEN } from "@/root/constants/errorCodes";
import { errorMessages } from "@/root/constants/errorMessages";
import { baseUrl } from "@/root/constants/url";
import { sendLoginEmail } from "@/root/utils/mailer";
import { decode, encode } from "@/root/utils/base64";
import { signJwt } from "@/root/utils/jwt";

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
      await sendLoginEmail({
        email: user.email,
        url: baseUrl,
        token: encode(`${token.id}:${user.email}`)
      });

      return true;
    }
  })
  .query('verify-otp', {
    input: verifyOTPSchema,
    async resolve({ctx, input}) {
      const {hash} = input;

      // check the encode function in the 'request-otp' mutation
      const decodedHash = decode(hash).split(':');
      const [id, email] = decodedHash;

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {email}
        },
        include: {
          user: true
        }
      })

      if (!token) {
        throw new trpc.TRPCError({
          code: FORBIDDEN,
          message: errorMessages.invalidToken
        })
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id
      })

      ctx.res.setHeader('Set-Cookie', serialize('token', jwt, {path: '/'}))

      return {
        redirect: token.redirect
      }
    }
  })
  .query('me', {
    resolve({ctx}) {
      return ctx.user
    }
  })