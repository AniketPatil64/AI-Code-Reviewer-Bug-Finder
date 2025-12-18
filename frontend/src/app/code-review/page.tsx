'use client';
import { useState } from 'react';
import {
  Code,
  Bug,
  Wrench,
  BookOpen,
  Clock,
  Send,
  Copy,
  Download,
  Share2,
  Moon,
  Sun,
} from 'lucide-react';
import Navbar from '@/components/dashboard/navbar';

interface CodeReviewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface CodeReviewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

/* ---------------------------------------------
   🔥 CONSTANT VALUES (Added + Expanded)
---------------------------------------------- */

// Language Dropdown Options
const LANGUAGE_OPTIONS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'C#',
  'PHP',
  'Swift',
];

// Severity Styles
const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-red-500/10 border-red-500/20 text-red-400',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  suggestion: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  minor: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
};

// Extra mock bugs (added values)
const MOCK_BUGS = [
  {
    line: 2,
    severity: 'critical',
    description: 'Null reference detected — possible crash',
    suggestion: 'Check object before accessing its properties',
  },
  {
    line: 10,
    severity: 'warning',
    description: 'Unused variable discovered',
    suggestion: 'Remove or use this variable',
  },
  {
    line: 5,
    severity: 'info',
    description: 'Function can be optimized for better memory usage',
    suggestion: 'Refactor repeated calculations into variables',
  },
  {
    line: 7,
    severity: 'suggestion',
    description: 'Consider using async/await instead of callbacks',
    suggestion: 'Rewrite function using async syntax for readability',
  },
];

export default function CodeReview({ onNavigate, onLogout }: CodeReviewProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState([]);
  const [activeTab, setActiveTab] = useState<
    'bugs' | 'fixes' | 'explanation' | 'complexity'
  >('bugs');
  const [isDark, setIsDark] = useState(true);

  const analyzeCode = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        id: Date.now().toString(),
        title: `code_${Date.now()}.${language.toLowerCase()}`,
        language,
        code,
        bugs: [
          {
            line: 3,
            severity: 'critical',
            description: 'Potential null pointer exception',
            suggestion: 'Add null check before accessing object properties',
          },
          {
            line: 7,
            severity: 'warning',
            description: 'Variable declared but never used',
            suggestion: 'Remove unused variable or implement its usage',
          },
          {
            line: 12,
            severity: 'info',
            description:
              'Consider using const instead of let for immutable values',
            suggestion: 'Replace let with const for better code clarity',
          },
        ],
        explanation: `This ${language} code contains several issues that could lead to runtime errors and maintainability problems. The most critical issue is the potential null pointer exception on line 3, which could crash the application if not handled properly. Additionally, there are code quality improvements that should be addressed, such as removing unused variables and following modern best practices for variable declaration.`,
        complexity:
          'O(n) - Linear time complexity. The algorithm iterates through the input once, making it efficient for most use cases.',
        date: new Date().toISOString().split('T')[0],
        bugsCount: 3,
        fixesCount: 3,
      };

      //   setResult(mockResult);
      //   onAddReview(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

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
        currentPage='review'
        onNavigate={onNavigate}
        // onLogout={onLogout}
      />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='mb-8'>
          <h1 className='text-4xl mb-2'>Code Review</h1>
          <p className='text-gray-400'>
            Paste your code and get instant AI-powered analysis
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* Left Panel - Code Input */}
          <div className='space-y-4'>
            <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
              <div className='flex items-center justify-between p-4 border-b border-white/10'>
                <div className='flex items-center gap-2'>
                  <div className='flex gap-1.5'>
                    <div className='w-3 h-3 rounded-full bg-red-500/50' />
                    <div className='w-3 h-3 rounded-full bg-yellow-500/50' />
                    <div className='w-3 h-3 rounded-full bg-green-500/50' />
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className='bg-transparent text-sm focus:outline-none cursor-pointer'
                  >
                    <option className='text-black' value='JavaScript'>
                      JavaScript
                    </option>
                    <option className='text-black' value='Python'>
                      Python
                    </option>
                    <option className='text-black' value='Java'>
                      Java
                    </option>
                    <option className='text-black' value='C++'>
                      C++
                    </option>
                    <option className='text-black' value='Go'>
                      Go
                    </option>
                    <option className='text-black' value='Rust'>
                      Rust
                    </option>
                    <option className='text-black' value='TypeScript'>
                      TypeScript
                    </option>
                  </select>
                </div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className='p-2 rounded-lg hover:bg-white/10 transition-colors'
                >
                  {isDark ? (
                    <Sun className='w-4 h-4' />
                  ) : (
                    <Moon className='w-4 h-4' />
                  )}
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Paste your code here...'
                className='w-full h-[500px] p-4 bg-transparent text-sm font-mono resize-none focus:outline-none'
                style={{ fontFamily: 'monospace' }}
              />
            </div>

            <button
              onClick={analyzeCode}
              disabled={!code || isAnalyzing}
              className='w-full px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
            >
              {isAnalyzing ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Send className='w-5 h-5' />
                  Analyze Code
                </>
              )}
            </button>
          </div>

          {/* Right Panel - AI Results */}
          <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
            {result ? (
              <div className='h-full flex flex-col'>
                {/* Tabs */}
                <div className='flex border-b border-white/10'>
                  <button
                    onClick={() => setActiveTab('bugs')}
                    className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'bugs'
                        ? 'bg-white/10 text-white border-b-2 border-red-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Bug className='w-4 h-4' />
                    Bugs
                  </button>
                  <button
                    onClick={() => setActiveTab('fixes')}
                    className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'fixes'
                        ? 'bg-white/10 text-white border-b-2 border-green-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Wrench className='w-4 h-4' />
                    Fixes
                  </button>
                  <button
                    onClick={() => setActiveTab('explanation')}
                    className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'explanation'
                        ? 'bg-white/10 text-white border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className='w-4 h-4' />
                    Explanation
                  </button>
                  <button
                    onClick={() => setActiveTab('complexity')}
                    className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'complexity'
                        ? 'bg-white/10 text-white border-b-2 border-purple-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Clock className='w-4 h-4' />
                    Complexity
                  </button>
                </div>

                {/* Content */}
                <div className='flex-1 p-6 overflow-auto'>
                  {activeTab === 'bugs' && (
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg'>
                          {/* {result.bugs.length}{' '} */}
                          {/* {result.bugs.length === 1 ? 'Bug' : 'Bugs'} Found */}
                        </h3>
                      </div>
                      {/* {result.bugs.map((bug, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${getSeverityColor(
                            bug.severity
                          )}`}
                        >
                          <div className='flex items-start justify-between mb-2'>
                            <span className='text-sm'>
                              Line {bug.line} • {bug.severity}
                            </span>
                          </div>
                          <p className='mb-2'>{bug.description}</p>
                        </div>
                      ))} */}
                    </div>
                  )}

                  {activeTab === 'fixes' && (
                    <div className='space-y-4'>
                      <h3 className='text-lg mb-4'>Suggested Fixes</h3>
                      {/* {result.bugs.map((bug, index) => (
                        <div
                          key={index}
                          className='p-4 rounded-lg bg-green-500/10 border border-green-500/20'
                        >
                          <div className='flex items-start justify-between mb-2'>
                            <span className='text-sm text-green-400'>
                              Line {bug.line}
                            </span>
                            <button className='p-1 rounded hover:bg-white/10 transition-colors'>
                              <Copy className='w-4 h-4' />
                            </button>
                          </div>
                          <p className='text-green-300 mb-2'>
                            {bug.suggestion}
                          </p>
                        </div>
                      ))} */}
                    </div>
                  )}

                  {activeTab === 'explanation' && (
                    <div>
                      <h3 className='text-lg mb-4'>Code Analysis</h3>
                      <p className='text-gray-300 leading-relaxed'>
                        {/* {result.explanation} */}
                      </p>
                    </div>
                  )}

                  {activeTab === 'complexity' && (
                    <div>
                      <h3 className='text-lg mb-4'>Time Complexity Analysis</h3>
                      <div className='p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-4'>
                        <div className='text-3xl mb-2 text-purple-300 font-mono'>
                          {/* {result.complexity.split('-')[0].trim()} */}
                        </div>
                      </div>
                      <p className='text-gray-300 leading-relaxed'>
                        {/* {result.complexity.split('-')[1]?.trim()} */}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className='p-4 border-t border-white/10 flex gap-2'>
                  <button className='flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm'>
                    <Copy className='w-4 h-4' />
                    Copy
                  </button>
                  <button className='flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm'>
                    <Download className='w-4 h-4' />
                    Download
                  </button>
                  <button className='flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm'>
                    <Share2 className='w-4 h-4' />
                    Share
                  </button>
                </div>
              </div>
            ) : (
              <div className='h-full flex items-center justify-center p-12 text-center'>
                <div>
                  <Code className='w-16 h-16 mx-auto mb-4 text-gray-600' />
                  <p className='text-gray-400'>
                    Paste your code and click &quot;Analyze Code&quot;
                  </p>
                  <p className='text-sm text-gray-500 mt-2'>
                    AI-powered analysis will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
