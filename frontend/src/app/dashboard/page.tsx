'use client';
import Navbar from '@/components/dashboard/navbar';
import { Code, Bug, Wrench, Globe, Eye, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewDetails: (id: string) => void;
}
interface historyItem {
  _id: string;
  id: string;
  aiResponse: {
    title: string;
    bugs: Array<{
      line: number;
      severity: 'low' | 'medium' | 'high';
      description: string;
    }>;
    fixes: Array<{
      line: number;
      suggestion: string;
    }>;
    explanation: Array<{
      line: number;
      text: string;
    }>;
    complexity: {
      time: string;
      space: string;
      explanation: string;
    };
    finalCode: string;
  };
  createdAt: Date;
  language: string;
}

export default function Dashboard({}: DashboardProps) {
  const router = useRouter();
  const [history, setHistory] = useState<historyItem[]>([]);
  const { data: session } = useSession();
  const [bugsFound, setBugsFound] = useState(0);
  const [fixesGenerated, setFixesGenerated] = useState(0);
  const [languagesDetected, setLanguagesDetected] = useState(0);
  const getFirstNameFormatted = (fullName?: string): string => {
    if (!fullName) return '';
    const firstName = fullName.trim().split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };
  const onNavigate = (page: string) => {
    router.push(`/${page}`);
  };
  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `/api/history?userId=${session?.user.id}&page=${1}&limit=${10}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        setHistory(data.data);
      } catch (error) {
        console.error('Error fetching user history:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUser();
  }, [session, router]);

  useEffect(() => {
    if (!history.length) {
      setBugsFound(0);
      setFixesGenerated(0);
      setLanguagesDetected(0);
      return;
    }

    const bugs = history.reduce(
      (sum, item) => sum + (item.aiResponse?.bugs?.length || 0),
      0
    );

    const fixes = history.reduce(
      (sum, item) => sum + (item.aiResponse?.fixes?.length || 0),
      0
    );

    const languages = new Set(history.map((item) => item.language)).size;

    setBugsFound(bugs);
    setFixesGenerated(fixes);
    setLanguagesDetected(languages);
  }, [history]);

  const onViewDetails = (id: string) => {
    router.push(`/code-review/${id}`);
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='dashboard'
        //onNavigate={onNavigate}
        // onLogout={onLogout}
      />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Greeting */}
        <div className='mb-12'>
          <h1 className='text-4xl mb-2'>
            Hey {getFirstNameFormatted(session?.user?.name || '')} 👋
          </h1>
          <p className='text-gray-400'>Here&apos;s your recent activity</p>
        </div>

        {/* Quick Action Card */}
        <div className='mb-12'>
          <button
            onClick={() => router.push('/code-review')}
            className='w-full p-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all group'
          >
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => router.push('/code-review')}
            >
              <div className='text-left'>
                <h2 className='text-2xl mb-2'>Start New Code Review</h2>
                <p className='text-purple-100'>
                  Paste your code and get instant AI-powered analysis
                </p>
              </div>
              <Code className='w-12 h-12 group-hover:scale-110 transition-transform' />
            </div>
          </button>
        </div>

        {/* Stats Overview */}
        <div className='mb-12'>
          <h2 className='text-xl mb-6'>Overview</h2>
          <div className='grid md:grid-cols-4 gap-6'>
            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-purple-500/20'>
                  <Code className='w-5 h-5 text-purple-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{history.length || '00'}</div>
              <div className='text-sm text-gray-400'>Total Reviews</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-red-500/20'>
                  <Bug className='w-5 h-5 text-red-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{bugsFound || '00'}</div>
              <div className='text-sm text-gray-400'>Bugs Found</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-green-500/20'>
                  <Wrench className='w-5 h-5 text-green-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{fixesGenerated || '00'}</div>
              <div className='text-sm text-gray-400'>Fixes Generated</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-blue-500/20'>
                  <Globe className='w-5 h-5 text-blue-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{languagesDetected || '00'}</div>
              <div className='text-sm text-gray-400'>Languages Detected</div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl'>Recent Reviews</h2>
            <button
              onClick={() => onNavigate('history')}
              className='text-sm text-purple-400 hover:text-purple-300 transition-colors'
            >
              View All
            </button>
          </div>

          <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-white/10 text-left'>
                  <th className='px-6 py-4 text-sm text-gray-400'>File Name</th>
                  <th className='px-6 py-4 text-sm text-gray-400'>Language</th>
                  <th className='px-6 py-4 text-sm text-gray-400'>Date</th>
                  <th className='px-6 py-4 text-sm text-gray-400'>Summary</th>
                  <th className='px-6 py-4 text-sm text-gray-400'>Status</th>
                </tr>
              </thead>
              <tbody>
                {history?.slice(0, 5).map((review) => (
                  <tr
                    key={review?._id}
                    className='border-b border-white/5 hover:bg-white/5 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <span className='font-mono text-sm'>
                        {review?.aiResponse?.title}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300'>
                        {review?.language}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400'>
                      {new Date(review?.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400'>
                      {review?.aiResponse?.bugs.length} bugs,{' '}
                      {review?.aiResponse?.fixes.length} fixes
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => onViewDetails(review._id)}
                        className='px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 text-sm'
                      >
                        <Eye className='w-4 h-4' />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {history?.length === 0 && (
              <div className='text-center py-12 text-gray-400'>
                <Code className='w-12 h-12 mx-auto mb-4 opacity-50' />
                <p>No reviews yet. Start your first code review!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
