'use client';
import { useState } from 'react';
import {
  ArrowLeft,
  Bug,
  Wrench,
  BookOpen,
  Clock,
  Copy,
  RefreshCw,
  Download,
} from 'lucide-react';
import Navbar from '@/components/dashboard/navbar';

interface ReviewDetailsProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  //   review: Review;
}

export default function ReviewDetails({
  onNavigate,
  onLogout,
}: //   review,
ReviewDetailsProps) {
  const [activeSection, setActiveSection] = useState<
    'bugs' | 'fixes' | 'explanation' | 'complexity'
  >('bugs');
  const [review, setReview] = useState({
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
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='details'
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Back Button */}
        <button
          onClick={() => onNavigate('history')}
          className='flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to History
        </button>

        {/* Header Summary */}
        <div className='mb-8 p-6 rounded-xl bg-white/5 border border-white/10'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h1 className='text-3xl mb-2'>{review.title}</h1>
              <div className='flex items-center gap-4 text-sm text-gray-400'>
                <span className='px-2 py-1 rounded bg-blue-500/20 text-blue-300'>
                  {review.language}
                </span>
                <span>
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>{review.bugsCount} bugs found</span>
              </div>
            </div>
            <button className='px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2'>
              <RefreshCw className='w-4 h-4' />
              Re-run Analysis
            </button>
          </div>

          <div className='grid grid-cols-3 gap-4 mt-6'>
            <div className='p-4 rounded-lg bg-white/5'>
              <div className='text-2xl mb-1'>{review.bugsCount}</div>
              <div className='text-sm text-gray-400'>Bugs Detected</div>
            </div>
            <div className='p-4 rounded-lg bg-white/5'>
              <div className='text-2xl mb-1'>{review.fixesCount}</div>
              <div className='text-sm text-gray-400'>Fixes Suggested</div>
            </div>
            <div className='p-4 rounded-lg bg-white/5'>
              <div className='text-2xl mb-1'>
                {review.code.split('\n').length}
              </div>
              <div className='text-sm text-gray-400'>Lines of Code</div>
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Left Sidebar - Navigation */}
          <div className='lg:col-span-1'>
            <div className='rounded-xl bg-white/5 border border-white/10 p-4 sticky top-20'>
              <h3 className='text-sm text-gray-400 mb-4'>Analysis Sections</h3>
              <div className='space-y-2'>
                <button
                  onClick={() => setActiveSection('bugs')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-3 ${
                    activeSection === 'bugs'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Bug className='w-5 h-5' />
                  <div>
                    <div>Bug Detection</div>
                    <div className='text-xs text-gray-500'>
                      {review.bugsCount} found
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('fixes')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-3 ${
                    activeSection === 'fixes'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Wrench className='w-5 h-5' />
                  <div>
                    <div>Fix Suggestions</div>
                    <div className='text-xs text-gray-500'>
                      {review.fixesCount} available
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('explanation')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-3 ${
                    activeSection === 'explanation'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className='w-5 h-5' />
                  <div>
                    <div>Explanation</div>
                    <div className='text-xs text-gray-500'>Full analysis</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('complexity')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-3 ${
                    activeSection === 'complexity'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Clock className='w-5 h-5' />
                  <div>
                    <div>Time Complexity</div>
                    <div className='text-xs text-gray-500'>Performance</div>
                  </div>
                </button>
              </div>

              <div className='mt-6 pt-6 border-t border-white/10'>
                <h3 className='text-sm text-gray-400 mb-3'>Metadata</h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Model used</span>
                    <span className='text-gray-300'>DeepSeek AI</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Tokens used</span>
                    <span className='text-gray-300'>1,247</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Time taken</span>
                    <span className='text-gray-300'>2.3s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Analysis Results */}
            <div className='rounded-xl bg-white/5 border border-white/10 p-6'>
              {activeSection === 'bugs' && (
                <div>
                  <h2 className='text-2xl mb-6'>Bug Detection</h2>
                  <div className='space-y-4'>
                    {review.bugs.map((bug, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${getSeverityColor(
                          bug.severity
                        )}`}
                      >
                        <div className='flex items-start justify-between mb-3'>
                          <div>
                            <span className='text-sm'>Line {bug.line}</span>
                            <span className='mx-2'>•</span>
                            <span className='text-sm capitalize'>
                              {bug.severity}
                            </span>
                          </div>
                          <button className='p-1 rounded hover:bg-white/10 transition-colors'>
                            <Copy className='w-4 h-4' />
                          </button>
                        </div>
                        <p className='mb-2'>{bug.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'fixes' && (
                <div>
                  <h2 className='text-2xl mb-6'>Fix Suggestions</h2>
                  <div className='space-y-4'>
                    {review.bugs.map((bug, index) => (
                      <div
                        key={index}
                        className='p-4 rounded-lg bg-green-500/10 border border-green-500/20'
                      >
                        <div className='flex items-start justify-between mb-3'>
                          <span className='text-sm text-green-400'>
                            Fix for Line {bug.line}
                          </span>
                          <button className='p-1 rounded hover:bg-white/10 transition-colors'>
                            <Copy className='w-4 h-4' />
                          </button>
                        </div>
                        <p className='text-green-300'>{bug.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'explanation' && (
                <div>
                  <h2 className='text-2xl mb-6'>Code Analysis</h2>
                  <p className='text-gray-300 leading-relaxed'>
                    {review.explanation}
                  </p>
                </div>
              )}

              {activeSection === 'complexity' && (
                <div>
                  <h2 className='text-2xl mb-6'>Time Complexity Analysis</h2>
                  <div className='p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-6'>
                    <div className='text-4xl mb-2 text-purple-300 font-mono'>
                      {review.complexity.split('-')[0].trim()}
                    </div>
                  </div>
                  <p className='text-gray-300 leading-relaxed'>
                    {review.complexity.split('-')[1]?.trim()}
                  </p>
                </div>
              )}
            </div>

            {/* Original Code */}
            <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
              <div className='px-6 py-4 border-b border-white/10 flex items-center justify-between'>
                <h2 className='text-xl'>Original Code</h2>
                <div className='flex gap-2'>
                  <button className='p-2 rounded-lg hover:bg-white/10 transition-colors'>
                    <Copy className='w-4 h-4' />
                  </button>
                  <button className='p-2 rounded-lg hover:bg-white/10 transition-colors'>
                    <Download className='w-4 h-4' />
                  </button>
                </div>
              </div>
              <pre className='p-6 overflow-x-auto'>
                <code className='text-sm font-mono text-gray-300'>
                  {review.code}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
