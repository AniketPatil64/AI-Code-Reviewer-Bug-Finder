'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import LandingPage from '@/components/landingPage/LandingPage';
import { NavigatePage } from '@/types/enums/navigation';

export default function Home() {
  const router = useRouter();
  const { status } = useSession(); // 👈 source of truth

  useEffect(() => {
    // console.log('Session status:', status);
    if (status === 'authenticated') {
      router.replace('/dashboard'); // redirect logged-in users
    }
  }, [status, router]);

  const handleNavigate = (page: string) => {
    if (page === NavigatePage.Login) {
      router.push('/login');
    } else if (page === NavigatePage.codeReview) {
      router.push('/code-review');
    } else if (page === NavigatePage.Demo) {
      router.push('/demo');
    }
  };

  // Optional: prevent landing page flash
  if (status === 'loading') return null;

  return <LandingPage onNavigate={handleNavigate} />;
}
