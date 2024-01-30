import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

export default function Home({
  searchParams,
}: {
  searchParams: {
    error?: string;
  }
}) {

  return (
    <main>
      <div className='flex justify-center'>
        {/* 这里可以根据错误码提示用户 */}
        {searchParams.error && (
          <p className="text-red-500">{searchParams.error}</p>
        )}
      </div>
      <div className="flex min-h-screen gap-3  items-center  justify-center">
        <form
          action={async () => {
            'use server';
            // 登录完成后，重定向到user页面
            await signIn('github', { redirectTo: '/user' });
          }}
        >
          <Button>github登录</Button>
        </form>
        <form
          action={async () => {
            'use server';
            // 登录完成后，重定向到user页面
            await signIn('google', { redirectTo: '/user' });
          }}
        >
          <Button>google登录</Button>
        </form>
        <form
          action={async () => {
            'use server';
            // 登录完成后，重定向到user页面
            await signIn('gitee', { redirectTo: '/user' });
          }}
        >
          <Button>gitee登录</Button>
        </form>
      </div>
    </main>
  );
}
