'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudioCard } from '@/components/studio/StudioCard';
import { Search, Filter, RotateCcw, AlertCircle } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const categories = [
  'All',
  'Photo Studio',
  'Film Stage',
  'Podcast Lounge',
  'Music Suite',
  'Workshop',
  'Art Studio',
];

function StudiosList() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(300);

  const fetchStudios = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      if (search.trim()) {
        params.append('search', search.trim());
      }
      if (maxPrice < 300) {
        params.append('maxPrice', maxPrice.toString());
      }
      if (sortBy) {
        params.append('sort', sortBy);
      }

      const res = await fetch(`${API_BASE}/studios?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setStudios(data.data || []);
      } else {
        setStudios([]);
      }
    } catch (err) {
      setStudios([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, search, maxPrice, sortBy]);

  useEffect(() => {
    fetchStudios();
  }, [fetchStudios]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setMaxPrice(300);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="space-y-3 mb-10 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>PRODUCTION DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
          Explore Production Studios
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal leading-relaxed">
          Discover verified creative spaces across major creative districts. Filter by space category, keyword specs, and hourly budget.
        </p>
      </div>

      <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-12 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by cyc wall, location, audio booth..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            >
              <option value="newest">Sort: Newest Spaces</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-1">
            <div className="flex justify-between text-xs font-mono text-neutral-500">
              <span>Max Budget:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ${maxPrice} / hr
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-neutral-100 dark:border-neutral-800/60">
          <span className="text-xs text-neutral-400 font-mono mr-2 shrink-0">
            Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
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
      ) : studios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio, idx) => (
            <StudioCard key={studio._id} studio={studio} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 p-8">
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              No Workspaces Match Your Parameters
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try adjusting your category selection, increasing the maximum hourly budget, or clearing your search query.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto" />
        </div>
      }
    >
      <StudiosList />
    </Suspense>
  );
}