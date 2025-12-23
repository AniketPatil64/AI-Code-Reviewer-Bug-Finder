'use client';
import {
  Bug,
  Users,
  Target,
  Zap,
  Award,
  Globe,
  Code,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({}: AboutPageProps) {
  const router = useRouter();
  const onNavigate = (page: string) => {
    router.push(page);
  };
  return (
    <div className='min-h-screen bg-black text-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className='relative'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          {/* Navigation */}
          <nav className='flex justify-between items-center mb-20'>
            <div
              onClick={() => onNavigate('landing')}
              className='flex items-center gap-2 cursor-pointer'
            >
              <Bug className='w-8 h-8 text-purple-400' />
              <span className='text-xl'>CodeReviewer</span>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => onNavigate('/')}
                className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('/contact-us')}
                className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
              >
                Contact
              </button>
              <button
                onClick={() => onNavigate('/login')}
                className='px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10'
              >
                Sign In
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className='text-center mb-20'>
            <h1 className='text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent'>
              About CodeReviewer
            </h1>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
              We&apos;re on a mission to help developers write better code,
              faster. Our AI-powered platform makes code review accessible,
              instant, and insightful for developers of all skill levels.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className='grid md:grid-cols-2 gap-6 mb-20 max-w-6xl mx-auto'>
            <div className='p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-colors'>
              <Target className='w-12 h-12 text-purple-400 mb-4' />
              <h2 className='text-3xl mb-4'>Our Mission</h2>
              <p className='text-gray-400'>
                To democratize code quality by providing instant, AI-powered
                code reviews that help developers catch bugs early, learn best
                practices, and ship better software with confidence.
              </p>
            </div>

            <div className='p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-colors'>
              <Sparkles className='w-12 h-12 text-blue-400 mb-4' />
              <h2 className='text-3xl mb-4'>Our Vision</h2>
              <p className='text-gray-400'>
                A world where every developer has access to expert-level code
                review, enabling them to focus on building innovative solutions
                while maintaining high code quality standards.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className='mb-20'>
            <h2 className='text-4xl text-center mb-12'>Our Core Values</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <Zap className='w-10 h-10 text-yellow-400 mb-4' />
                <h3 className='text-xl mb-2'>Speed</h3>
                <p className='text-gray-400 text-sm'>
                  Get instant feedback in seconds, not hours or days
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <Award className='w-10 h-10 text-green-400 mb-4' />
                <h3 className='text-xl mb-2'>Quality</h3>
                <p className='text-gray-400 text-sm'>
                  Leveraging cutting-edge AI for accurate, reliable analysis
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <Users className='w-10 h-10 text-blue-400 mb-4' />
                <h3 className='text-xl mb-2'>Community</h3>
                <p className='text-gray-400 text-sm'>
                  Built by developers, for developers
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <Globe className='w-10 h-10 text-purple-400 mb-4' />
                <h3 className='text-xl mb-2'>Accessibility</h3>
                <p className='text-gray-400 text-sm'>
                  Making expert code review available to everyone
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className='max-w-4xl mx-auto mb-20'>
            <div className='p-10 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-white/10'>
              <Code className='w-12 h-12 text-purple-400 mb-6' />
              <h2 className='text-3xl mb-6'>Our Story</h2>
              <div className='space-y-4 text-gray-400'>
                <p>
                  CodeReviewer was born from a simple observation: developers
                  spend countless hours debugging code that could have been
                  caught earlier with proper review. But code reviews are
                  time-consuming, require expertise, and aren&apos;t always
                  accessible to solo developers or small teams.
                </p>
                <p>
                  We asked ourselves: what if AI could provide instant,
                  expert-level code review? What if every developer, regardless
                  of experience level or team size, could get immediate feedback
                  on their code quality, potential bugs, and optimization
                  opportunities?
                </p>
                <p>
                  That question led us to build CodeReviewer - an AI-powered
                  platform that combines the speed of automation with the
                  insight of expert review. Today, we&apos;re helping thousands
                  of developers write better code, catch bugs faster, and
                  continuously improve their skills.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className='mb-20'>
            <h2 className='text-4xl text-center mb-12'>
              Powered by Advanced AI
            </h2>

            <div className='max-w-4xl mx-auto space-y-6'>
              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-4'>
                <div className='w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0' />
                <div>
                  <h3 className='text-xl mb-2'>Large Language Models</h3>
                  <p className='text-gray-400'>
                    We leverage state-of-the-art LLMs trained on billions of
                    lines of code to understand context, detect subtle bugs, and
                    provide accurate suggestions across multiple programming
                    languages.
                  </p>
                </div>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-4'>
                <div className='w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0' />
                <div>
                  <h3 className='text-xl mb-2'>Static Analysis Integration</h3>
                  <p className='text-gray-400'>
                    Our AI combines machine learning with traditional static
                    analysis tools to catch both common errors and complex logic
                    issues that might slip through automated testing.
                  </p>
                </div>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-4'>
                <div className='w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0' />
                <div>
                  <h3 className='text-xl mb-2'>Continuous Learning</h3>
                  <p className='text-gray-400'>
                    Our models are regularly updated with the latest programming
                    patterns, security best practices, and industry standards to
                    ensure you receive current, relevant feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className='text-center mb-20'>
            <div className='p-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto'>
              <h2 className='text-4xl mb-6'>Ready to Improve Your Code?</h2>
              <p className='text-xl text-gray-400 mb-8'>
                Join thousands of developers who trust CodeReviewer for instant,
                AI-powered code analysis.
              </p>
              <div className='flex gap-4 justify-center'>
                <button
                  onClick={() => onNavigate('login')}
                  className='px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors'
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className='px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10'
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Bug className='w-6 h-6 text-purple-400' />
              <span>CodeReviewer</span>
            </div>

            <div className='flex gap-8 text-sm text-gray-400'>
              <button
                onClick={() => onNavigate('landing')}
                className='hover:text-white transition-colors'
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('about')}
                className='hover:text-white transition-colors'
              >
                About
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className='hover:text-white transition-colors'
              >
                Contact
              </button>
            </div>
          </div>

          <div className='text-center mt-8 text-sm text-gray-500'>
            © 2025 CodeReviewer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
