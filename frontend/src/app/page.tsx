'use client';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/landingPage/LandingPage';
import { NavigatePage } from '@/types/enums/navigation';
export default function Home() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === NavigatePage.Login) {
      router.push('/login');
    } else if (page === NavigatePage.Google) {
      router.push('/auth/google');
    } else if (page === NavigatePage.Github) {
      router.push('/auth/github');
    } else if (page === NavigatePage.Demo) {
      router.push('/demo');
    }
  };

  return (
    <div>
      <LandingPage onNavigate={handleNavigate} />
    </div>
  );
}
