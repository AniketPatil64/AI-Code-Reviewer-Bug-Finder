'use client';

import {
  Bug,
  LayoutDashboard,
  Code,
  History,
  User,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface NavbarProps {
  currentPage: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'code-review', label: 'Code Review', icon: Code },
    ...(isAuthenticated
      ? [
          { id: 'history', label: 'History', icon: History },
          { id: 'profile', label: 'Profile', icon: User },
        ]
      : []),
  ];

  const onNavigate = (id: string) => {
    router.push(`/${id}`);
  };

  const onLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className='border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-8'>
            {/* Logo */}
            <button
              onClick={() => router.push('/')}
              className='flex items-center gap-2 hover:opacity-80 cursor-pointer'
            >
              <Bug className='w-6 h-6 text-purple-400' />
              <span className='text-lg'>CodeReviewer</span>
            </button>

            {/* Nav items */}
            <div className='hidden md:flex gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    <span className='text-sm'>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          {isAuthenticated && (
            <button
              onClick={onLogout}
              className='px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-2'
            >
              <LogOut className='w-4 h-4' />
              <span className='text-sm hidden md:inline'>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
