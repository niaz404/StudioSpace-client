'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Aperture } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-amber-500">
            <Aperture className="w-6 h-6 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            Loading Workspace...
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Verifying session</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
};
