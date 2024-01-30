import { IconQingzhu } from '@/assets/icons/qingzhu'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function RegisterResultPage() {
  return (
    <div className='mt-[20px] px-[100px]'>
      <Alert>
        <AlertTitle className='flex items-center'>
          <IconQingzhu className='text-green-500' />
          注册成功!
        </AlertTitle>
        <AlertDescription>
          您的验证邮件已发送，请前往验证。
          <Link href="/auth/login">
            <Button color="green" variant="link">
              已验证？返回登录
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}

