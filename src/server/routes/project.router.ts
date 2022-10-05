import { createRouter } from '@/root/server/createRouter';
import {
  projectSchema,
  singleProjectSchema,
  updateProjectSchema,
} from '@/root/schema/project.schema';

export const projectRouter = createRouter()
  .mutation('create-project', {
    input: projectSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.create({
        data: {
          ...input,
          user: {
            connect: {
              // @ts-ignore
              id: ctx.session?.id,
            },
          },
        },
      });
    },
  })
  .mutation('update-project', {
    input: updateProjectSchema,
    async resolve({ ctx, input }) {
      const { projectId, title, body } = input;
      return await ctx.prisma.project.update({
        where: { id: projectId },
        data: { title, body },
      });
    },
  })
  .mutation('delete-project', {
    input: singleProjectSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.delete({
        where: { id: input.projectId },
      });
    },
  })
  .query('projects', {
    resolve({ ctx }) {
      return ctx.prisma.project.findMany();
    },
  })
  .query('single-project', {
    input: singleProjectSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
    },
  });
