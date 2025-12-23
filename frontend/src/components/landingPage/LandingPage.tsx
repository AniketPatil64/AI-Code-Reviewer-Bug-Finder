'use client';
import {
  Bug,
  Wrench,
  BookOpen,
  Clock,
  Github,
  Mail,
  Shield,
} from 'lucide-react';
import { signIn } from 'next-auth/react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const onGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className='relative max-w-7xl mx-auto px-6 nav-spacing'>
          {/* Navigation */}
          <nav className='flex justify-between items-center mb-24'>
            <div className='flex items-center gap-2'>
              <Bug className='w-8 h-8 text-purple-400' />
              <span className='text-xl'>CodeReviewer</span>
            </div>
            <button
              onClick={() => onNavigate('login')}
              className='px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10'
            >
              Sign In
            </button>
          </nav>

          {/* Hero Content */}
          <div className='text-center mb-20'>
            <h1 className='text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent'>
              AI Code Reviewer & Bug Finder
              <br />
              for Developers
            </h1>
            <p className='text-xl text-gray-400 mb-10 max-w-2xl mx-auto'>
              Paste your code → Get instant bug reports, fixes, complexity, and
              explanations.
            </p>

            <div className='flex gap-4 justify-center'>
              <button
                onClick={onGithubLogin}
                className='px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2'
              >
                <Github className='w-5 h-5' />
                Sign In with GitHub
              </button>
              <button
                onClick={() => onNavigate('code-review')}
                className='px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10'
              >
                Try Demo
              </button>
            </div>
          </div>

          {/* Demo Box */}
          <div className='max-w-6xl mx-auto'>
            <div className='rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl'>
              <div className='grid md:grid-cols-2 divide-x divide-white/10'>
                {/* Left: Code Editor */}
                <div className='p-6'>
                  <div className='flex items-center gap-2 mb-4 text-sm text-gray-400'>
                    <div className='flex gap-1.5'>
                      <div className='w-3 h-3 rounded-full bg-red-500/50' />
                      <div className='w-3 h-3 rounded-full bg-yellow-500/50' />
                      <div className='w-3 h-3 rounded-full bg-green-500/50' />
                    </div>
                    <span>example.js</span>
                  </div>
                  <pre className='text-sm text-gray-300 font-mono'>
                    <code>{`function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`}</code>
                  </pre>
                </div>

                {/* Right: AI Response */}
                <div className='p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20'>
                  <div className='mb-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Bug className='w-4 h-4 text-red-400' />
                      <span className='text-sm text-red-400'>2 Bugs Found</span>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='p-3 rounded-lg bg-red-500/10 border border-red-500/20'>
                      <p className='text-sm mb-1'>
                        <span className='text-red-400'>Line 3:</span> Off-by-one
                        error
                      </p>
                      <p className='text-xs text-gray-400'>
                        Loop condition should be{' '}
                        <code className='text-green-400'>
                          i &lt; items.length
                        </code>
                      </p>
                    </div>

                    <div className='p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20'>
                      <p className='text-sm mb-1'>
                        <span className='text-yellow-400'>Line 2:</span> Use
                        const/let instead of var
                      </p>
                      <p className='text-xs text-gray-400'>
                        Modern JavaScript best practice
                      </p>
                    </div>

                    <div className='pt-3 border-t border-white/10'>
                      <p className='text-xs text-gray-400'>
                        <span className='text-purple-400'>Complexity:</span>{' '}
                        O(n)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className='max-w-7xl mx-auto px-6 py-24'>
        <h2 className='text-4xl text-center mb-16'>Key Features</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors'>
            <Bug className='w-10 h-10 text-red-400 mb-4' />
            <h3 className='text-xl mb-2'>Bug Detection</h3>
            <p className='text-gray-400 text-sm'>
              Automatically identify bugs, errors, and potential issues in your
              code
            </p>
          </div>

          <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors'>
            <Wrench className='w-10 h-10 text-green-400 mb-4' />
            <h3 className='text-xl mb-2'>Auto Fix Suggestions</h3>
            <p className='text-gray-400 text-sm'>
              Get instant, actionable suggestions to fix detected issues
            </p>
          </div>

          <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors'>
            <BookOpen className='w-10 h-10 text-blue-400 mb-4' />
            <h3 className='text-xl mb-2'>Readable Explanation</h3>
            <p className='text-gray-400 text-sm'>
              Clear, human-readable explanations of what went wrong
            </p>
          </div>

          <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors'>
            <Clock className='w-10 h-10 text-purple-400 mb-4' />
            <h3 className='text-xl mb-2'>Time Complexity</h3>
            <p className='text-gray-400 text-sm'>
              Analyze and optimize your code&apos;s performance characteristics
            </p>
          </div>
        </div>
      </div>

      {/* Why Developers Love It */}
      <div className='max-w-7xl mx-auto px-6 py-24'>
        <h2 className='text-4xl text-center mb-16'>Why Developers Love It</h2>

        <div className='max-w-3xl mx-auto space-y-6'>
          <div className='flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
            <div className='w-2 h-2 rounded-full bg-purple-400 mt-2' />
            <div>
              <h3 className='text-xl mb-2'>Works with any language</h3>
              <p className='text-gray-400'>
                JavaScript, Python, Java, C++, Go, Rust, and more. Our AI
                understands them all.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
            <div className='w-2 h-2 rounded-full bg-purple-400 mt-2' />
            <div>
              <h3 className='text-xl mb-2'>Fast and accurate using LLMs</h3>
              <p className='text-gray-400'>
                Powered by advanced language models for precise code analysis in
                seconds.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
            <div className='w-2 h-2 rounded-full bg-purple-400 mt-2' />
            <div>
              <h3 className='text-xl mb-2'>Beautiful, modern UI</h3>
              <p className='text-gray-400'>
                Clean, intuitive interface that makes code review a pleasant
                experience.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
            <div className='w-2 h-2 rounded-full bg-purple-400 mt-2' />
            <div>
              <h3 className='text-xl mb-2'>Saves debugging time</h3>
              <p className='text-gray-400'>
                Catch bugs before they reach production and spend less time
                debugging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t border-white/10 mt-24'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Bug className='w-6 h-6 text-purple-400' />
              <span>CodeReviewer</span>
            </div>

            <div className='flex gap-8 text-sm text-gray-400'>
              <a
                href='https://github.com/AniketPatil64/AI-Code-Reviewer-Bug-Finder'
                className='hover:text-white transition-colors flex items-center gap-2'
              >
                <Github className='w-4 h-4' />
                GitHub
              </a>
              <a
                href='/about-us'
                className='hover:text-white transition-colors flex items-center gap-2'
              >
                <Mail className='w-4 h-4' />
                About us
              </a>
              <a
                href='/contact-us'
                className='hover:text-white transition-colors flex items-center gap-2'
              >
                <Mail className='w-4 h-4' />
                Contact us
              </a>
            </div>
          </div>

          <div className='text-center mt-8 text-sm text-gray-500'>
            © 2025 CodeReviewer. All rights reserved.
          </div>
          <div className='text-center mt-4 text-sm text-gray-500'>
            Developed by Aniket Patil.
          </div>
        </div>
      </footer>
    </div>
  );
}
