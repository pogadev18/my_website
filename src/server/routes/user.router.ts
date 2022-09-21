import * as trpc from '@trpc/server';
import { hash } from "argon2";

import { createRouter } from "@/root/server/createRouter";
import { signUpSchema } from "@/root/schema/user.schema";

import { CONFLICT } from "@/root/constants/errorCodes";
import { errorMessages } from "@/root/constants/errorMessages";

export const userRouter = createRouter()
  .mutation('register-user', {
    input: signUpSchema,
    async resolve({ctx, input}) {
      const {name, email, password} = input;

      const userExists = await ctx.prisma.user.findFirst({where: {email}})

      if (userExists) {
        throw new trpc.TRPCError({
          code: CONFLICT,
          message: errorMessages.userAlreadyExists
        })
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });


      return {
        status: 201,
        email: result.email,
        name: result.name
      };
    }
  })