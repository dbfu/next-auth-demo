'use client'

import { IconQingzhu } from '@/assets/icons/qingzhu'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { activateUser } from './action'

export default function ActivateClient() {

  const params = useSearchParams();
  const token = params.get('token');

  const [error, setError] = useState('');
  const [success, setSucess] = useState('');

  const activate = useCallback(() => {

    setError('');
    setSucess('');

    if (!token) {
      return;
    }

    activateUser(token).then((result) => {
      if (result?.error) {
        setError(result.error);
      }
      if (result?.success) {
        setSucess(result.success);
      }
    });
  }, [token])

  useEffect(() => {
    activate();
  }, [activate]);

  if (!error && !success) {
    return (
      <div className='mt-[20px] px-[100px]'>
        <Alert>
          <AlertTitle className='flex items-center gap-2'>
            <LoadingOutlined />
            激活中...
          </AlertTitle>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className='mt-[20px] px-[100px]'>
        <Alert>
          <AlertTitle className='flex items-center'>
            <IconQingzhu className='text-green-500' />
            {success}
          </AlertTitle>
          <AlertDescription>
            <Link href="/auth/login">
              <Button color="green" variant="link">
                返回登录
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className='mt-[20px] px-[100px]'>
      <Alert>
        <AlertDescription className='flex items-center gap-2'>
          <ExclamationCircleOutlined className='text-red-700' />
          {error}
        </AlertDescription>
      </Alert>
    </div>
  )
}

