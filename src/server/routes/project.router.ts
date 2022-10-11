import { createRouter } from '@/root/server/createRouter';
import {
  paginationSchema,
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
      const { projectId, title, body, imageUrl } = input;
      return await ctx.prisma.project.update({
        where: { id: projectId },
        data: { title, body, imageUrl },
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
    input: paginationSchema,
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 6;
      const { cursor } = input;

      const projects = await ctx.prisma.project.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor

        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log('server projects:', projects.length);

      let nextCursor: typeof cursor | undefined = undefined;
      if (projects.length > limit) {
        const nextProject = projects.pop();
        console.log('next item!!', nextProject);
        nextCursor = nextProject!.id;
      }
      return {
        projects,
        nextCursor,
      };
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
