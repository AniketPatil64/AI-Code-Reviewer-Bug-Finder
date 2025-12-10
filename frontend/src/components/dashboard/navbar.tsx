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

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  //   onLogout: () => void;
}

export default function Navbar({
  currentPage,
}: //   onNavigate,
//   onLogout,
NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'code-review', label: 'Code Review', icon: Code },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  const router = useRouter();

  const onNavigate = (id: string) => {
    router.push(id);
  };

  const onLogout = () => {
    router.push('/');
  };

  return (
    <nav className='border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-8'>
            <button
              onClick={() => onNavigate('dashboard')}
              className='flex items-center gap-2 hover:opacity-80 transition-opacity'
            >
              <Bug className='w-6 h-6 text-purple-400' />
              <span className='text-lg'>CodeReviewer</span>
            </button>

            <div className='hidden md:flex gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
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

          <button
            onClick={onLogout}
            className='px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2'
          >
            <LogOut className='w-4 h-4' />
            <span className='text-sm hidden md:inline'>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
