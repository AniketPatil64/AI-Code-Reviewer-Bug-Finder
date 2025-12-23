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
  Loader,
} from 'lucide-react';
import Navbar from '@/components/dashboard/navbar';
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'next/navigation';
import CommonModal from '@/components/popup/CommonModal';
import { useSession } from 'next-auth/react';

interface CodeReviewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface CodeReviewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface AnalysisResult {
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
}

export default function CodeReview({}: CodeReviewProps) {
  const [code, setCode] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [language, setLanguage] = useState('JavaScript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>({} as AnalysisResult);
  const { attempts, increment, isLoggedIn } = useDemoStore();
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'bugs' | 'fixes' | 'explanation' | 'complexity'
  >('bugs');
  const [isDark, setIsDark] = useState(true);

  function buildPrompt(code: string, language: string) {
    return `
  You are an expert ${language} code reviewer.

  Analyze the following code and return ONLY valid JSON.
  DO NOT add markdown.
  DO NOT add explanations outside JSON.
  DO NOT wrap the response in \`\`\`.

  JSON format MUST be exactly:

  {
  "title": string,
  "bugs": [
      {
        "line": number,
        "severity": "low" | "medium" | "high",
        "description": string
      }
    ],
    "fixes": [
      {
        "line": number,
        "suggestion": string
      }
    ],
    "explanation": [
      {
        "line": number,
        "text": string
      }
    ],
    "complexity": {
      "time": string,
      "space": string,
      "explanation": string
    },
    "finalCode": string
  }

  Rules:
  - title MUST be a short descriptive summary of the code issue (max 4 words)
  - explanation MUST be line-by-line (one entry per line of code)
  - complexity MUST ONLY describe time and space complexity
  - bugs MUST include exact line numbers
  - fixes MUST directly correspond to bugs (same line numbers)
  - finalCode MUST contain the FULL corrected code so it can be copied directly
  - return ONLY valid JSON

  Code to analyze:
  ${code}
    `;
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    if (status !== 'authenticated' && !isLoggedIn) {
      if (attempts >= 3) {
        setIsModalOpen(true);
        setShowLimitPopup(true);
        return;
      }
    }

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: buildPrompt(code, language),
      }),
    });

    // 👇 Parse JSON properly
    const data = await res.json();
    if (data && data.bugs && data.fixes) {
      setResult(data);
      await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id, // from NextAuth
          inputCode: code,
          aiResponse: data, // your AI JSON response
          language: language,
        }),
      });
    }

    if (isLoggedIn) {
      return;
    }

    increment();
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/10';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'border-green-500 bg-green-500/10';
      default:
        return 'border-white/10';
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='review'
        // onNavigate={onNavigate}
        // onLogout={onLogout}
      />
      {showLimitPopup && (
        <CommonModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='🔒 Demo Limit Reached'
          message='Unlock unlimited code reviews by signing in—improve your code instantly.'
          buttons={[
            { label: 'Sign In', route: '/login', variant: 'primary' },
            {
              label: 'Cancel',
              action: () => router.push('/'),
              variant: 'secondary',
            },
          ]}
        />
      )}

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
              onClick={handleAnalyze}
              disabled={!code || isAnalyzing}
              className='w-full px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
            >
              {isAnalyzing ? (
                <>
                  <Loader className='w-5 h-5' />
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
                          {result?.bugs?.length || ''}{' '}
                          {result?.bugs?.length === 1 ? 'Bug' : 'Bugs'} Found
                        </h3>
                      </div>
                      {result?.bugs?.map((bug, index) => (
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
                          <p className='mb-2 text-sm'>{bug.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'fixes' && (
                    <div className='space-y-4'>
                      <h3 className='text-lg mb-4'>Suggested Fixes</h3>
                      {result?.finalCode?.split('\n').map((line, index) => (
                        <div key={index} className='flex text-sm font-mono'>
                          <span className='text-gray-500 mr-4 w-8 text-right select-none'>
                            {index + 1}
                          </span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'explanation' && (
                    <div>
                      <h3 className='text-lg mb-4'>Code Analysis</h3>
                      <div className='text-gray-300 leading-relaxed space-y-2'>
                        {result?.explanation?.map((item, index) => (
                          <div key={index} className='text-sm'>
                            <p className='p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-4'>
                              <strong>Line {item.line}:</strong> {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'complexity' && (
                    <div>
                      <h3 className='text-lg mb-4'>
                        Time & Space Complexity Analysis
                      </h3>
                      {result?.complexity?.time && (
                        <div className='p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-4'>
                          <div className='text-sm mb-2 text-purple-300 font-mono'>
                            Time: {result?.complexity?.time}
                          </div>
                        </div>
                      )}
                      {result?.complexity?.space && (
                        <div className='p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-4'>
                          <div className='text-sm mb-2 text-purple-300 font-mono'>
                            Space: {result?.complexity?.space}
                          </div>
                        </div>
                      )}
                      {result?.complexity?.explanation && (
                        <div className='p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mt-4'>
                          <p className='text-sm'>
                            {result?.complexity?.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                {activeTab === 'fixes' && (
                  <div className='p-4 border-t border-white/10 flex gap-2'>
                    <button
                      className='flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm'
                      onClick={() => {
                        if (result?.finalCode) {
                          navigator.clipboard.writeText(result.finalCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500); // hide after 1.5s
                        }
                      }}
                    >
                      <Copy className='w-4 h-4' />
                      {copied ? 'Copied!' : 'Copy'}
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
                )}
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
