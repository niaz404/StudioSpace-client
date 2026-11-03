'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    name: 'Photo Studios',
    param: 'Photo Studio',
    count: '18 Spaces',
    specs: 'Daylight cyc walls & lofts',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sound Stages',
    param: 'Film Stage',
    count: '12 Stages',
    specs: 'Acoustic walls & pipe grids',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Podcast Rooms',
    param: 'Podcast Lounge',
    count: '15 Lounges',
    specs: '4K cameras & Shure mics',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Music Suites',
    param: 'Music Suite',
    count: '9 Suites',
    specs: 'Tuned acoustics & vocal booths',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Art Workshops',
    param: 'Workshop',
    count: '14 Lofts',
    specs: 'Natural skylights & work tables',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  },
];

export const CategoryBrowse = () => {
  return (
    <section className="py-16 bg-neutral-100/60 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-500">
              Browse Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Spaces Tailored to Your Production
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
              Find creative spaces equipped with the acoustics, lighting, and gear required for your project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-amber-500 transition-colors group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/studios?category=${encodeURIComponent(cat.param)}`}
                className="group relative block h-80 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent transition-opacity duration-300 group-hover:via-neutral-950/75" />

                <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-neutral-900/70 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-400/50 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-neutral-700/60">
                      {cat.count}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-1 font-normal">
                      {cat.specs}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};