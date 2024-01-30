'use server';

import { prisma } from '@/lib/prisma';

export const activateUser = async (token: string) => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });


  if (!verificationToken || verificationToken.expires < new Date()) {
    return {
      error: '当前连接已失效',
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: verificationToken.identifier,
    },
  });

  if (!user) {
    return {
      error: '激活失败，请联系管理员',
    };
  }

  await prisma.verificationToken.delete({
    where: {
      token: verificationToken.token,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return {
    success: '激活成功',
  };
};
