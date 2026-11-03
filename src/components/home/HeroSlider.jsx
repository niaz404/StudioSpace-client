'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: 'Photography Studios',
    title: 'Daylight Lofts & Cyclorama Stages',
    subtitle:
      'Discover natural daylight lofts and curved infinity cyc walls with professional lighting gear, grip packages, and private styling rooms.',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    category: 'Photo Studio',
    rate: '$65 / hr',
    location: 'Brooklyn Arts District, New York',
    specs: '2,800 sq ft · 18ft Ceilings',
  },
  {
    id: 2,
    tag: 'Film & Cinema Stages',
    title: 'Sound Stages for Commercial Film Production',
    subtitle:
      'Acoustically isolated stages with overhead pipe grids, drive-in roll-up doors, high-amperage power, and dedicated green room suites.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85',
    category: 'Film Stage',
    rate: '$120 / hr',
    location: 'Silver Lake Hub, Los Angeles',
    specs: '4,500 sq ft · Drive-in Access',
  },
  {
    id: 3,
    tag: 'Audio & Music Suites',
    title: 'Tuned Audio Suites & Vocal Recording Booths',
    subtitle:
      'Calibrated listening environments with vocal isolation booths, Neumann microphones, analog gear, and comfortable creative lounges.',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2000&q=85',
    category: 'Music Suite',
    rate: '$50 / hr',
    location: 'East Austin Creative Quarter, Austin',
    specs: '1,200 sq ft · Floating Floor',
  },
  {
    id: 4,
    tag: 'Podcast & Broadcast',
    title: 'Multi-Camera 4K Broadcast Podcast Lounges',
    subtitle:
      'Turnkey multi-camera podcast studios with Shure SM7B arrays, live video switching, cinematic backlighting, and instant master export.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2000&q=85',
    category: 'Podcast Lounge',
    rate: '$75 / hr',
    location: 'River North District, Chicago',
    specs: '950 sq ft · 4x Sony FX3',
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full pt-4 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white border border-neutral-800/80 shadow-xl min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-xs font-medium text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>StudioSpace Platform</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-neutral-400">
              <span>0{current + 1}</span>
              <span>/</span>
              <span>0{slides.length}</span>
            </div>
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-14 max-w-2xl space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="inline-block"
              >
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                  {slides[current].tag}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <div className="px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-400">Rate:</span>{' '}
                <span className="text-white font-semibold">{slides[current].rate}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-400">Location:</span>{' '}
                <span className="text-neutral-200">{slides[current].location}</span>
              </div>
              <div className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-200">{slides[current].specs}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm group"
              >
                <span>Explore Studios</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-700 bg-neutral-900/60 backdrop-blur hover:bg-neutral-800 text-white transition-colors"
              >
                <span>Host Your Space</span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 p-6 sm:p-8 border-t border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="py-1 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      current === idx
                        ? 'w-8 bg-amber-500'
                        : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">50+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Verified Studios</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">100%</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Collision-Proof Booking</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">4.9★</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Average Creator Rating</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">$1M</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Host Protection</p>
          </div>
        </div>

      </div>
    </section>
  );
};