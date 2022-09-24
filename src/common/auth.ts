import { NextAuthOptions } from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "@/root/utils/prisma";
import { loginSchema } from "@/root/schema/user.schema";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: {email: creds.email},
        });

        if (!user) return null;

        const isValidPassword = await verify(user.password, creds.password)

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          description: user.description,
          github: user.githubLink,
          linkedin: user.linkedInLink
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({session, token}) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  secret: process.env.SECRET_JWT_KEY,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
}