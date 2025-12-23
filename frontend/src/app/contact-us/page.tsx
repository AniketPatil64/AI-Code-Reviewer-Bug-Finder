'use client';
import {
  Bug,
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({}: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const onNavigate = (page: string) => {
    router.push(page);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              onClick={() => onNavigate('/')}
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
                onClick={() => onNavigate('/about-us')}
                className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
              >
                About
              </button>
              <button
                onClick={() => onNavigate('login')}
                className='px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10'
              >
                Sign In
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className='text-center mb-20'>
            <h1 className='text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent'>
              Get in Touch
            </h1>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Contact Content */}
          <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20'>
            {/* Contact Form */}
            <div className='p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'>
              <h2 className='text-3xl mb-6'>Send us a Message</h2>

              {submitted ? (
                <div className='p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center'>
                  <div className='w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Send className='w-8 h-8 text-green-400' />
                  </div>
                  <h3 className='text-xl mb-2 text-green-400'>Message Sent!</h3>
                  <p className='text-gray-400'>
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block mb-2 text-sm text-gray-400'
                    >
                      Your Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors'
                      placeholder='John Doe'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm text-gray-400'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors'
                      placeholder='john@example.com'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm text-gray-400'
                    >
                      Subject
                    </label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors'
                    >
                      <option value='' className='bg-gray-900'>
                        Select a subject
                      </option>
                      <option value='general' className='bg-gray-900'>
                        General Inquiry
                      </option>
                      <option value='support' className='bg-gray-900'>
                        Technical Support
                      </option>
                      <option value='billing' className='bg-gray-900'>
                        Billing Question
                      </option>
                      <option value='feature' className='bg-gray-900'>
                        Feature Request
                      </option>
                      <option value='partnership' className='bg-gray-900'>
                        Partnership Opportunity
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block mb-2 text-sm text-gray-400'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors resize-none'
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type='submit'
                    className='w-full px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2'
                  >
                    <Send className='w-5 h-5' />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className='space-y-6'>
              {/* Contact Cards */}
              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-purple-400' />
                  </div>
                  <div>
                    <h3 className='text-xl mb-2'>Email Us</h3>
                    <p className='text-gray-400 mb-1'>
                      For general inquiries and support
                    </p>
                    <a
                      href='mailto:support@codereviewer.ai'
                      className='text-purple-400 hover:text-purple-300 transition-colors'
                    >
                      aniketpatil6400@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0'>
                    <MessageSquare className='w-6 h-6 text-blue-400' />
                  </div>
                  <div>
                    <h3 className='text-xl mb-2'>
                      Live Chat Feature Comming Soon
                    </h3>
                    <p className='text-gray-400 mb-1'>
                      Available Monday - Friday, 9AM - 6PM EST
                    </p>
                    <button className='text-blue-400 hover:text-blue-300 transition-colors'>
                      Start a conversation
                    </button>
                  </div>
                </div>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-colors'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-green-400' />
                  </div>
                  <div>
                    <h3 className='text-xl mb-2'>Office</h3>
                    <p className='text-gray-400'>
                      Pune
                      <br />
                      Maharashtra
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10'>
                <h3 className='text-xl mb-4'>Connect With Us</h3>
                <p className='text-gray-400 mb-4'>
                  Follow us on social media for updates, tips, and developer
                  insights
                </p>
                <div className='flex gap-4'>
                  <a
                    href='https://github.com/AniketPatil64/AI-Code-Reviewer-Bug-Finder'
                    className='w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/10'
                    aria-label='GitHub'
                  >
                    <Github className='w-5 h-5' />
                  </a>
                  <a
                    href='https://www.linkedin.com/in/aniket-patil-110303218/'
                    className='w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/10'
                    aria-label='LinkedIn'
                  >
                    <Linkedin className='w-5 h-5' />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className='max-w-4xl mx-auto mb-20'>
            <h2 className='text-4xl text-center mb-12'>
              Frequently Asked Questions
            </h2>

            <div className='space-y-4'>
              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <h3 className='text-xl mb-2'>
                  How quickly can I expect a response?
                </h3>
                <p className='text-gray-400'>
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent technical issues, our support team
                  is available via live chat during business hours.
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <h3 className='text-xl mb-2'>
                  Do you offer enterprise support?
                </h3>
                <p className='text-gray-400'>
                  Yes! We offer dedicated enterprise support with custom SLAs,
                  priority assistance, and direct access to our engineering
                  team. Contact us to learn more about our enterprise plans.
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <h3 className='text-xl mb-2'>
                  Can I request a feature or integration?
                </h3>
                <p className='text-gray-400'>
                  Absolutely! We love hearing from our users about features
                  they&apos;d like to see. Use the contact form above with the
                  &quot;Feature Request&quot; subject to share your ideas with
                  our product team.
                </p>
              </div>

              <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                <h3 className='text-xl mb-2'>
                  Is there a community forum or Slack channel?
                </h3>
                <p className='text-gray-400'>
                  Yes! We have an active developer community on Discord and
                  GitHub Discussions where you can connect with other users,
                  share tips, and get help. Links are available in your
                  dashboard after signing up.
                </p>
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
                onClick={() => onNavigate('/')}
                className='hover:text-white transition-colors cursor-pointer'
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('/about-us')}
                className='hover:text-white transition-colors cursor-pointer'
              >
                About
              </button>
              <button
                onClick={() => onNavigate('/contact-us')}
                className='hover:text-white transition-colors cursor-pointer'
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
