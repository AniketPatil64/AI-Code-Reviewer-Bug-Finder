'use client';
import Navbar from '@/components/dashboard/navbar';
import { Code, Bug, Wrench, Globe, Eye, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewDetails: (id: string) => void;
}

export default function Dashboard({
  onNavigate,
  onLogout,
  onViewDetails,
}: DashboardProps) {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      title: 'authentication.js',
      language: 'JavaScript',
      code: 'function login(user, pass) {\n  if (user == admin) {\n    return true;\n  }\n}',
      bugs: [
        {
          line: 2,
          severity: 'critical',
          description: 'Using == instead of === allows type coercion',
          suggestion: 'Use strict equality (===) for comparison',
        },
        {
          line: 1,
          severity: 'warning',
          description: 'Password parameter is not being validated',
          suggestion: 'Add password validation before authentication',
        },
      ],
      explanation:
        'This login function has security vulnerabilities including loose equality comparison and missing password validation.',
      complexity: 'O(1) - Constant time complexity',
      date: '2025-12-07',
      bugsCount: 2,
      fixesCount: 2,
    },
    {
      id: '2',
      title: 'sorting.py',
      language: 'Python',
      code: 'def bubble_sort(arr):\n  for i in range(len(arr)):\n    for j in range(len(arr)):\n      if arr[j] > arr[j+1]:\n        arr[j], arr[j+1] = arr[j+1], arr[j]',
      bugs: [
        {
          line: 4,
          severity: 'critical',
          description:
            'Index out of bounds error - j+1 can exceed array length',
          suggestion:
            'Change range to len(arr)-1 or len(arr)-i-1 for optimization',
        },
      ],
      explanation:
        'Classic bubble sort implementation with an index boundary issue that will cause runtime errors.',
      complexity: 'O(n²) - Quadratic time complexity',
      date: '2025-12-06',
      bugsCount: 1,
      fixesCount: 1,
    },
  ]);
  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='dashboard'
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Greeting */}
        <div className='mb-12'>
          <h1 className='text-4xl mb-2'>Hey Aniket 👋</h1>
          <p className='text-gray-400'>Here&apos;s your recent activity</p>
        </div>

        {/* Quick Action Card */}
        <div className='mb-12'>
          <button
            onClick={() => onNavigate('review')}
            className='w-full p-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all group'
          >
            <div className='flex items-center justify-between'>
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
              <div className='text-3xl mb-1'>{'00'}</div>
              <div className='text-sm text-gray-400'>Total Reviews</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-red-500/20'>
                  <Bug className='w-5 h-5 text-red-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{'00'}</div>
              <div className='text-sm text-gray-400'>Bugs Found</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-green-500/20'>
                  <Wrench className='w-5 h-5 text-green-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{'00'}</div>
              <div className='text-sm text-gray-400'>Fixes Generated</div>
            </div>

            <div className='p-6 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-blue-500/20'>
                  <Globe className='w-5 h-5 text-blue-400' />
                </div>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <div className='text-3xl mb-1'>{'00'}</div>
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
                {reviews.slice(0, 5).map((review) => (
                  <tr
                    key={review.id}
                    className='border-b border-white/5 hover:bg-white/5 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <span className='font-mono text-sm'>{review.title}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300'>
                        {review.language}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400'>
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400'>
                      {review.bugsCount} bugs, {review.fixesCount} fixes
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => onViewDetails(review.id)}
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

            {reviews.length === 0 && (
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
