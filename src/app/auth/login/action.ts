'use server';

import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import type { LoginFormSchemaType } from './page';

export const loginWithGithub = async () => {
  await signIn('github', {
    redirectTo: '/user',
  });
};

export const loginWithGoogle = async () => {
  await signIn('google', {
    redirectTo: '/user',
  });
};

export const loginWithGitee = async () => {
  await signIn('gitee', {
    redirectTo: '/user',
  });
};

export const loginWithCredentials = async (
  credentials: LoginFormSchemaType
): Promise<void | {error?: string}> => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!existUser || !existUser.email) {
    return {
      error: '用户名不存在',
    };
  }

  if (!existUser.emailVerified) {
    return {
      error: '用户未激活，请激活后登录',
    };
  }

  try {
    await signIn('credentials', {
      ...credentials,
      redirectTo: '/user',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: '用户名或密码错误',
      };
    }

    // 这里一定要抛出异常，不然成功登录后不会重定向
    throw error;
  }
};
