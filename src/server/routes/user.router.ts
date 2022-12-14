import * as trpc from '@trpc/server';
import { hash } from 'argon2';

import { createRouter } from '@/root/server/createRouter';
import { signUpSchema, updateUserSchema } from '@/root/schema/user.schema';

import { CONFLICT } from '@/root/constants/errorCodes';
import { errorMessages } from '@/root/constants/errorMessages';

export const userRouter = createRouter()
  .mutation('register-user', {
    input: signUpSchema,
    async resolve({ ctx, input }) {
      const { name, email, password, description, githubLink, linkedInLink } = input;

      const userExists = await ctx.prisma.user.findFirst({ where: { email } });

      if (userExists) {
        throw new trpc.TRPCError({
          code: CONFLICT,
          message: errorMessages.userAlreadyExists,
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          description,
          githubLink,
          linkedInLink,
        },
      });

      return {
        status: 201,
        email: result.email,
        name: result.name,
      };
    },
  })
  .mutation('update-user', {
    input: updateUserSchema,
    async resolve({ ctx, input }) {
      // const { email, password, description, linkedInLink, githubLink, workStatus, name } = input;

      const hashedPassword = await hash(input.password);

      return await ctx.prisma.user.update({
        where: { email: input.email },
        data: { ...input, password: hashedPassword },
      });
    },
  })
  .query('me', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findFirst({
        select: {
          name: true,
          email: true,
          description: true,
          githubLink: true,
          linkedInLink: true,
          workStatus: true,
        },
      });
    },
  });
