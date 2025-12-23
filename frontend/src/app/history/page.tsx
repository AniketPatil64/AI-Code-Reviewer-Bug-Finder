'use client';

import { useEffect, useMemo, useState } from 'react';
import { Eye, Filter, Calendar } from 'lucide-react';
import Navbar from '@/components/dashboard/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface HistoryProps {
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

export default function History({}: HistoryProps) {
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
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
  const [history, setHistory] = useState<historyItem[]>([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: session } = useSession();
  const languages = useMemo(
    () => ['all', ...Array.from(new Set(history.map((r) => r.language)))],
    [history]
  );

  const filteredReviews = reviews.filter((review) => {
    const languageMatch =
      filterLanguage === 'all' || review.language === filterLanguage;
    const dateMatch = filterDate === 'all' || review.date === filterDate;
    return languageMatch && dateMatch;
  });

  const getSeverityColor = (count: number) => {
    if (count === 0) return 'text-green-400';
    if (count <= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `/api/history?userId=${session?.user.id}&page=${page}&limit=${limit}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        setHistory(data?.data);
      } catch (error) {
        console.error('Error fetching user history:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUser();
  }, [session, page, limit]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const languageMatch =
        filterLanguage === 'all' || item.language === filterLanguage;

      const dateMatch =
        filterDate === 'all' ||
        new Date(item.createdAt).toISOString().split('T')[0] === filterDate;

      return languageMatch && dateMatch;
    });
  }, [history, filterLanguage, filterDate]);

  const onViewDetails = (id: string) => {
    router.push(`/code-review/${id}`);
  };
  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='history'
        //onNavigate={onNavigate}
        // onLogout={onLogout}
      />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='mb-8'>
          <h1 className='text-4xl mb-2'>Review History</h1>
          <p className='text-gray-400'>All your past code reviews</p>
        </div>

        {/* Filters */}
        <div className='flex flex-wrap gap-4 mb-8'>
          <div className='flex items-center gap-2'>
            <Filter className='w-4 h-4 text-gray-400' />
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className='px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500 transition-colors'
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className='text-black'>
                  {lang === 'all' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </div>
          {/* <div className='ml-auto text-sm text-gray-400'>
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div> */}
        </div>

        {/* Reviews Table */}
        <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/10 text-left'>
                <th className='px-6 py-4 text-sm text-gray-400'>Review ID</th>
                <th className='px-6 py-4 text-sm text-gray-400'>File Name</th>
                <th className='px-6 py-4 text-sm text-gray-400'>Language</th>
                <th className='px-6 py-4 text-sm text-gray-400'>Bugs</th>
                <th className='px-6 py-4 text-sm text-gray-400'>Date</th>
                <th className='px-6 py-4 text-sm text-gray-400'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((review, index) => (
                <tr
                  key={review.id}
                  className='border-b border-white/5 hover:bg-white/5 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <span className='font-mono text-sm text-gray-400'>
                      #{index + 1}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='font-mono text-sm'>
                      {review?.aiResponse?.title}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300'>
                      {review.language}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`${getSeverityColor(
                        review?.aiResponse.bugs.length
                      )}`}
                    >
                      {review?.aiResponse.bugs.length}{' '}
                      {review?.aiResponse.bugs.length === 1 ? 'bug' : 'bugs'}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-400'>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => onViewDetails(review._id)}
                      className='px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 text-sm'
                    >
                      <Eye className='w-4 h-4' />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {history.length === 0 && (
            <div className='text-center py-12 text-gray-400'>
              <p>No reviews found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
