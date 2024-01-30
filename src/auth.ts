import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { LoginFormSchemaType } from './app/auth/login/page';
import { prisma } from './lib/prisma';
import Gitee from './providers/gitee';

export const {handlers, auth, signIn, signOut} = NextAuth({
  pages: {
    signIn: '/',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const {email, password} = credentials as LoginFormSchemaType;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || !user.password) return null;

        if (
          !(await bcrypt.compare(password, user.password))
        ) {
          return null;
        }

        return user;
      },
    }),
    Github,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Gitee({
      clientId: process.env.GITEE_CLIENT_ID,
      clientSecret: process.env.GITEE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({token}) => {
      return token;
    },
    session: async ({session, token}) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
