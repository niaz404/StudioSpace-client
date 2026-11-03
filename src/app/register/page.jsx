'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Check,
  X,
  ArrowUpRight,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasLength = password.length >= 6;
  const isPasswordValid = hasUpper && hasLower && hasLength;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMsg('Please satisfy all password criteria before submitting.');
      return;
    }

    setLoading(true);
    const finalPhoto =
      photoURL.trim() ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

    const success = await register(name, email, password, finalPhoto);
    setLoading(false);

    if (success) {
      router.push('/login');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    const success = await googleLogin(
      'Alex Vance',
      'alex.creator@studiospace.io',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    );
    setLoading(false);
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>JOIN THE ROSTER</span>
          </div>
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Register on KURA // StudioSpace
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Join thousands of photographers, filmmakers, and studio hosts.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-600 dark:text-red-400 font-medium animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="jordan@director.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                Avatar Photo URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-2.5 p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1.5">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  Password Requirements:
                </p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className={`flex items-center space-x-1.5 ${hasLength ? 'text-emerald-500 font-medium' : 'text-neutral-400'}`}>
                    {hasLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 ${hasUpper ? 'text-emerald-500 font-medium' : 'text-neutral-400'}`}>
                    {hasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 ${hasLower ? 'text-emerald-500 font-medium' : 'text-neutral-400'}`}>
                    {hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>One lowercase letter</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{loading ? 'Creating Account...' : 'Register'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-neutral-900 text-neutral-400 font-mono">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-medium transition-colors flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-neutral-900 dark:text-white hover:text-amber-500">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}