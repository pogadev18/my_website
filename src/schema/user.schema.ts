import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export const signUpSchema = loginSchema.extend({
  name: z.string().min(3).max(15),
  description: z.string().min(10).max(1000),
  githubLink: z.string(),
  linkedInLink: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
