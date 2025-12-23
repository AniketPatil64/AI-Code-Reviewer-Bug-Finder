'use client';

import { useEffect, useState } from 'react';
import { Code, Copy, ArrowLeft, Play } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/dashboard/navbar';

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
  title: string;
}

export default function ReadOnlyCodeReview() {
  const router = useRouter();
  const { id } = useParams(); // review/history id

  const [code, setCode] = useState(''); // will be set in useEffect later
  const [language] = useState('JavaScript');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<
    'bugs' | 'fixes' | 'explanation' | 'complexity'
  >('bugs');
  const Tabs = ['bugs', 'fixes', 'explanation', 'complexity'] as const;
  const [copied, setCopied] = useState(false);

  // 🔹 You will add useEffect here later
  useEffect(() => {
    if (!id) return; // 🔐 guard

    const fetchHistory = async () => {
      const res = await fetch(`/api/history/${id}`);
      if (!res.ok) return;

      const data = await res.json();

      setCode(data.inputCode);
      setResult(data.aiResponse);
    };

    fetchHistory();
  }, [id]);

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar currentPage='review' />

      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='mb-8'>
          <h1 className='text-4xl mb-2'>
            Code Review: {result?.title || 'No Title Found'}
          </h1>
          <p className='text-gray-400'>
            Viewing previously submitted code review
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* LEFT PANEL */}
          <div className='space-y-4'>
            <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
              <div className='p-4 border-b border-white/10 text-sm text-gray-400'>
                Language: {language}
              </div>

              <textarea
                value={code}
                readOnly
                placeholder='Code will load here...'
                className='w-full h-[500px] p-4 bg-transparent text-sm font-mono resize-none focus:outline-none cursor-not-allowed'
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className='flex gap-3'>
              <button
                onClick={() => router.push(`/dashboard`)}
                className='flex-1 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2'
              >
                <ArrowLeft className='w-5 h-5' />
                Back
              </button>

              <button
                onClick={() => {
                  router.push(`/code-review`);
                }}
                className='flex-1 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2'
              >
                <Play className='w-5 h-5' />
                Start Review
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className='rounded-xl bg-white/5 border border-white/10 overflow-hidden'>
            {result ? (
              <div className='h-full flex flex-col'>
                {/* Tabs */}
                <div className='flex border-b border-white/10'>
                  {Tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 py-3 text-sm capitalize ${
                        activeTab === tab
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className='flex-1 p-6 overflow-auto space-y-4'>
                  {/* BUGS */}
                  {activeTab === 'bugs' && (
                    <>
                      <h3 className='text-lg mb-2'>
                        {result.bugs.length} Bug
                        {result.bugs.length !== 1 && 's'} Found
                      </h3>

                      {result.bugs.map((bug, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            bug.severity === 'high'
                              ? 'border-red-500 bg-red-500/10'
                              : bug.severity === 'medium'
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-green-500 bg-green-500/10'
                          }`}
                        >
                          <p className='text-sm mb-1'>
                            Line {bug.line} • {bug.severity}
                          </p>
                          <p className='text-sm text-gray-300'>
                            {bug.description}
                          </p>
                        </div>
                      ))}
                    </>
                  )}

                  {/* FIXES */}
                  {activeTab === 'fixes' && (
                    <>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.finalCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                        className='mb-4 px-4 py-2 rounded bg-white/10 text-sm'
                      >
                        <Copy className='inline w-4 h-4 mr-2' />
                        {copied ? 'Copied' : 'Copy Final Code'}
                      </button>

                      {result.finalCode.split('\n').map((line, i) => (
                        <div key={i} className='text-sm font-mono'>
                          <span className='text-gray-500 mr-4'>{i + 1}</span>
                          {line}
                        </div>
                      ))}
                    </>
                  )}

                  {/* EXPLANATION */}
                  {activeTab === 'explanation' && (
                    <>
                      <h3 className='text-lg mb-2'>Line-by-line Explanation</h3>

                      {result.explanation.map((item, index) => (
                        <div
                          key={index}
                          className='p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm'
                        >
                          <strong>Line {item.line}:</strong> {item.text}
                        </div>
                      ))}
                    </>
                  )}

                  {/* COMPLEXITY */}
                  {activeTab === 'complexity' && (
                    <>
                      <h3 className='text-lg mb-2'>Complexity Analysis</h3>

                      <div className='p-4 rounded-lg bg-purple-500/10 border border-purple-500/20'>
                        <p className='text-sm mb-1'>
                          <strong>Time:</strong> {result.complexity.time}
                        </p>
                      </div>
                      <div className='p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mt-4'>
                        <p className='text-sm mb-1'>
                          <strong>Space:</strong> {result.complexity.space}
                        </p>
                      </div>
                      <div className='p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mt-4'>
                        <p className='text-sm'>
                          {result.complexity.explanation}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className='h-full flex items-center justify-center p-12 text-gray-500'>
                <div className='text-center'>
                  <Code className='w-14 h-14 mx-auto mb-4 opacity-50' />
                  <p>Click “Start Review” to load analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
