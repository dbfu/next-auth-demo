"use client"

import { IconGiteefillround } from '@/assets/icons/gitee-fill-round'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Separator } from '@/components/ui/separator'
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons'
import Link from 'next/link'

import ColorfulCard from '@/components/colorful-card'
import { loginWithCredentials, loginWithGitee, loginWithGithub, loginWithGoogle } from './action'

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function LoginPage() {

  const { toast } = useToast();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: LoginFormSchemaType) {
    const result = await loginWithCredentials(values);

    if (result?.error) {
      toast({
        title: '登录失败',
        description: result.error,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className='py-[100px] flex justify-center'>
      <ColorfulCard>
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-[20px] w-[420px]"
            >
              <div className='flex justify-center my-[20px]'>
                <h1 className='text-2xl font-bold text-[#6960EC]'>登录</h1>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='mt-[20px]'>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex justify-between mt-[20px]'>
                <Button size='lg' className='w-full' type="submit">
                  登录
                </Button>
              </div>
              <Separator className="my-4 bg-[#666]" />
              <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <Button
                    size='lg'
                    variant='secondary'
                    type="button"
                    className='px-0 flex-1 flex justify-center gap-1'
                    onClick={() => loginWithGithub()}
                  >
                    <GithubOutlined />GitHub登录
                  </Button>
                  <Button
                    size='lg'
                    variant='secondary'
                    type="button"
                    className='px-0 flex-1 flex justify-center gap-1'
                    onClick={() => loginWithGoogle()}
                  >
                    <GoogleOutlined /> Google登录
                  </Button>
                  <Button
                    size='lg'
                    variant='secondary'
                    type="button"
                    className='px-0 flex-1 flex justify-center gap-1'
                    onClick={() => loginWithGitee()}
                  >
                    <IconGiteefillround /> Gitee登录
                  </Button>
                </div>
                <Link href="/auth/register">
                  <Button size='lg' variant='link' className='w-full mt-[12px]' type='button'>
                    还没有账号？注册新用户
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </Form>
      </ColorfulCard>
    </div>
  )
}
