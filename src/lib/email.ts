import * as nodemailer from 'nodemailer';

export interface MailInfo {
  // 目标邮箱
  to: string;
  // 标题
  subject: string;
  // 文本
  text?: string;
  // 富文本，如果文本和富文本同时设置，富文本生效。
  html?: string;
}

export const sendEmail = async (mailInfo: MailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +(process.env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 定义transport对象并发送邮件
  const info = await transporter.sendMail({
    from: `next-auth-demo <${process.env.MAIL_USER}>`,
    ...mailInfo,
  });

  return info;
};
