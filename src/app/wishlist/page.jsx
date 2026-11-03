'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { StudioCard } from '@/components/studio/StudioCard';
import { Heart } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function WishlistPage() {
  const { user, token } = useAuth();
  const { savedIds } = useWishlist();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistStudios = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setStudios(data.data || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchWishlistStudios();
  }, [fetchWishlistStudios, savedIds]);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-semibold text-rose-500 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Saved Studios</span>
            </p>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              My Saved Spaces
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Quick access to your curated collection of favorite creative studios and stages.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <span>Explore More Spaces</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700"
              />
            ))}
          </div>
        ) : studios.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Your Wishlist is Empty
            </h3>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Click the heart icon on any studio card to save it here for fast comparisons and easy booking.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/studios"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <span>Browse Studios</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
