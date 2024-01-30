'use server';

import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { RegisterFormSchemaType } from './page';


export const register = async (data: RegisterFormSchemaType) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existUser) {
    return {
      error: '当前邮箱已存在！',
    };
  }

  // 给密码加盐，密码明文存数据库不安全
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.username,
      password: hashedPassword,
      email: data.email,
    },
  });

  const token = uuid();

  // 数据中生成一个验证token，过期时间为1小时
  await prisma.verificationToken.create({
    data: {
      identifier: data.email,
      token,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  await sendEmail({
    to: data.email,
    subject: '注册成功',
    html: `点击激活账号 <a href="https://auth.fluxyadmin.cn/auth/activate?token=${token}">激活</a>`,
  });

};
