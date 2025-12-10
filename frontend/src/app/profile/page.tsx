'use client';
import { useState } from 'react';
import {
  User,
  Mail,
  Github,
  Chrome,
  Moon,
  Sun,
  Bell,
  Shield,
} from 'lucide-react';
import Navbar from '@/components/dashboard/navbar';

interface ProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Profile({ onNavigate, onLogout }: ProfileProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar
        currentPage='profile'
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='mb-8'>
          <h1 className='text-4xl mb-2'>Profile Settings</h1>
          <p className='text-gray-400'>Manage your account and preferences</p>
        </div>

        <div className='space-y-6'>
          {/* Profile Information */}
          <div className='rounded-xl bg-white/5 border border-white/10 p-6'>
            <h2 className='text-xl mb-6'>Profile Information</h2>

            <div className='flex items-center gap-4 mb-6'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center'>
                <User className='w-10 h-10' />
              </div>
              <div>
                <h3 className='text-xl'>Aniket</h3>
                <p className='text-gray-400 text-sm'>Developer</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm text-gray-400 mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  defaultValue='Aniket'
                  className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500 transition-colors'
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-2'>
                  Email Address
                </label>
                <div className='flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10'>
                  <Mail className='w-5 h-5 text-gray-400' />
                  <span>aniket@example.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className='rounded-xl bg-white/5 border border-white/10 p-6'>
            <h2 className='text-xl mb-6'>Connected Accounts</h2>

            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-white text-black'>
                    <Github className='w-5 h-5' />
                  </div>
                  <div>
                    <div>GitHub</div>
                    <div className='text-sm text-gray-400'>
                      Connected as @aniket
                    </div>
                  </div>
                </div>
                <button className='px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors text-sm'>
                  Disconnect
                </button>
              </div>

              <div className='flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-white'>
                    <Chrome className='w-5 h-5' />
                  </div>
                  <div>
                    <div>Google</div>
                    <div className='text-sm text-gray-400'>Not connected</div>
                  </div>
                </div>
                <button className='px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-sm'>
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className='rounded-xl bg-white/5 border border-white/10 p-6'>
            <h2 className='text-xl mb-6'>Preferences</h2>

            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 rounded-lg bg-white/5'>
                <div className='flex items-center gap-3'>
                  {isDarkMode ? (
                    <Moon className='w-5 h-5 text-purple-400' />
                  ) : (
                    <Sun className='w-5 h-5 text-yellow-400' />
                  )}
                  <div>
                    <div>Dark Mode</div>
                    <div className='text-sm text-gray-400'>
                      Use dark theme for better readability
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    isDarkMode ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className='flex items-center justify-between p-4 rounded-lg bg-white/5'>
                <div className='flex items-center gap-3'>
                  <Bell className='w-5 h-5 text-blue-400' />
                  <div>
                    <div>Email Notifications</div>
                    <div className='text-sm text-gray-400'>
                      Receive updates about your reviews
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className='rounded-xl bg-white/5 border border-white/10 p-6'>
            <h2 className='text-xl mb-6'>Security</h2>

            <div className='space-y-4'>
              <button className='w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Shield className='w-5 h-5 text-green-400' />
                  <div className='text-left'>
                    <div>Two-Factor Authentication</div>
                    <div className='text-sm text-gray-400'>
                      Add an extra layer of security
                    </div>
                  </div>
                </div>
                <span className='text-sm text-purple-400'>Enable</span>
              </button>

              <button className='w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between'>
                <div className='text-left'>
                  <div>Sessions</div>
                  <div className='text-sm text-gray-400'>
                    Manage your active sessions
                  </div>
                </div>
                <span className='text-sm text-purple-400'>View</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='rounded-xl bg-red-500/10 border border-red-500/20 p-6'>
            <h2 className='text-xl mb-6 text-red-400'>Danger Zone</h2>

            <div className='space-y-4'>
              <button className='w-full p-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition-colors text-red-400 text-left'>
                <div className='mb-1'>Delete Account</div>
                <div className='text-sm text-red-400/70'>
                  Permanently delete your account and all data
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
