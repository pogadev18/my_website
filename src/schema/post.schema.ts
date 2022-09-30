import z from 'zod';

export const projectSchema = z.object({
  title: z.string().min(5).max(256, 'Max characters is 256'),
  body: z.string().min(10),
});

export type PostInput = z.TypeOf<typeof projectSchema>;

export const singleProjectSchema = z.object({
  projectId: z.string().uuid(),
});

export const updateProjectSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string(),
  body: z.string(),
});

export type UpdatePostInput = z.TypeOf<typeof updateProjectSchema>;
