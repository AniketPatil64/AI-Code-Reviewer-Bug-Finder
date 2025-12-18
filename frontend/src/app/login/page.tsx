'use client';
import { Github, Chrome, Bug, StepBack } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useDemoStore } from '@/store/demoStore';
import { useEffect } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const router = useRouter();
  const { status } = useSession(); // 👈 source of truth

  useEffect(() => {
    // console.log('Session status:', status);
    if (status === 'authenticated') {
      router.replace('/dashboard'); // redirect logged-in users
    }
  }, [status, router]);
  const setLoggedIn = useDemoStore((s) => s.setLoggedIn);
  const onGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/dashboard',
    });
  };
  const onGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    });
  };
  return (
    <>
      <nav className='flex justify-between items-center nav-spacing'>
        <div
          className='flex items-center gap-2 ml-24 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <StepBack className='w-6 h-6 text-purple-400' />
          <span className='text-xl'>Back</span>
        </div>
      </nav>
      <div className='min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative code pattern */}
        <div className='absolute top-20 left-20 text-purple-500/10 font-mono text-xs rotate-12'>
          <pre>{`function debug() {
  return true;
}`}</pre>
        </div>
        <div className='absolute bottom-20 right-20 text-blue-500/10 font-mono text-xs -rotate-12'>
          <pre>{`const fix = (bug) => {
  return solution;
}`}</pre>
        </div>

        <div className='relative w-full max-w-md px-6'>
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='p-4 rounded-2xl bg-purple-600/20 border border-purple-500/30'>
                <Bug className='w-12 h-12 text-purple-400' />
              </div>
            </div>
            <h1 className='text-4xl mb-3'>Welcome back</h1>
            <p className='text-gray-400'>Login to continue reviewing code</p>
          </div>

          <div className='space-y-4'>
            <button
              onClick={onGithubLogin}
              className='w-full px-6 py-4 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 group'
            >
              <Github className='w-5 h-5 group-hover:scale-110 transition-transform' />
              <span>Sign in with GitHub</span>
            </button>

            <button
              onClick={onGoogleLogin}
              className='w-full px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10 flex items-center justify-center gap-3 group'
            >
              <Chrome className='w-5 h-5 group-hover:scale-110 transition-transform' />
              <span>Sign in with Google</span>
            </button>
          </div>

          <p className='text-center text-xs text-gray-500 mt-8'>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
}
