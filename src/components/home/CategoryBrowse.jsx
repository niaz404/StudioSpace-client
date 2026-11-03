'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera,
  Film,
  Mic,
  Music,
  Palette,
  ArrowUpRight,
} from 'lucide-react';

const categories = [
  {
    num: '01',
    name: 'Photo Studios',
    param: 'Photo Studio',
    count: '18 Available',
    specs: 'Daylight cyc walls & north skylights',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    name: 'Sound Stages',
    param: 'Film Stage',
    count: '12 Available',
    specs: 'Acoustic treatment & overhead grids',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    name: 'Podcast Rooms',
    param: 'Podcast Lounge',
    count: '15 Available',
    specs: 'Multi-cam 4K & broadcast switching',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    name: 'Music Suites',
    param: 'Music Suite',
    count: '9 Available',
    specs: 'Floating floors & vocal isolation',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '05',
    name: 'Art Workshops',
    param: 'Workshop',
    count: '14 Available',
    specs: 'High ceilings, sinks & sculpture benches',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  },
];

export const CategoryBrowse = () => {
  return (
    <section className="py-20 bg-neutral-100/50 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>SPATIAL CURATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Spaces Tailored to Your Medium
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl font-normal leading-relaxed">
              Explore spaces engineered for acoustics, light direction, high-amperage power, and specialized production workflow.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/studios?category=${encodeURIComponent(cat.param)}`}
                  className="group relative block h-88 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-all duration-300"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-transparent transition-opacity duration-300 group-hover:via-neutral-950/80" />

                  <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-neutral-400 font-semibold">{cat.num}</span>
                      <div className="w-8 h-8 rounded-full bg-neutral-900/70 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-400/50 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-neutral-700/60">
                        {cat.count}
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-snug line-clamp-2 font-normal">
                        {cat.specs}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};