'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudioCard } from '@/components/studio/StudioCard';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const filterPills = [
  { label: 'All Curated', value: 'ALL' },
  { label: 'Photo Studios', value: 'Photo Studio' },
  { label: 'Film Stages', value: 'Film Stage' },
  { label: 'Podcast Lounges', value: 'Podcast Lounge' },
  { label: 'Music Suites', value: 'Music Suite' },
];

export const FeaturedStudios = () => {
  const [studios, setStudios] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_BASE}/studios/featured`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStudios(data.data || []);
          }
        }
      } catch (err) {
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedStudios = activeFilter === 'ALL'
    ? studios
    : studios.filter((s) => s.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-200/80 dark:border-neutral-800 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>FEATURED SELECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Curated Creative Workspaces
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl font-normal leading-relaxed">
            Reserve verified daylight cycloramas, acoustic sound stages, and broadcast rooms with collision-proof live availability.
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors group shrink-0"
        >
          <span>View All Workspaces</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {filterPills.map((pill) => (
          <button
            key={pill.value}
            onClick={() => setActiveFilter(pill.value)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === pill.value
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm'
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-4 space-y-4 animate-pulse bg-white/40 dark:bg-neutral-900/40"
            >
              <div className="aspect-[16/11] rounded-xl bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-full pt-4" />
            </div>
          ))}
        </div>
      ) : displayedStudios.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {displayedStudios.map((studio, idx) => (
              <StudioCard key={studio._id} studio={studio} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/20">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">No spaces found in this category.</p>
        </div>
      )}
    </section>
  );
};