'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkle, Shield, Compass, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    indexTag: '01 // CYCLORAMA & NATURAL LIGHT',
    title: 'Sunlit Daylight Lofts & Infinity Cyc Stages',
    subtitle:
      'Curated south-facing natural daylight lofts and curved infinity cyc walls equipped with continuous Profoto strobes, grip packages, and private glam dressing suites.',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    category: 'Photo Studio',
    rate: '$65',
    location: 'Brooklyn Arts District, New York',
    specs: '2,800 sq ft · 18ft Ceilings · 100A 3-Phase',
  },
  {
    id: 2,
    indexTag: '02 // CINEMA & SOUNDSTAGE',
    title: 'Sound-Isolated Stages for Commercial Production',
    subtitle:
      'Acoustically treated stages featuring overhead modular pipe grids, drive-in roll-up doors, high-amperage power drops, and sound-isolated green room suites.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85',
    category: 'Film Stage',
    rate: '$120',
    location: 'Silver Lake Production Hub, Los Angeles',
    specs: '4,500 sq ft · Soundproof STC 55 · Drive-in Access',
  },
  {
    id: 3,
    indexTag: '03 // DOLBY AUDIO SUITES',
    title: 'Calibrated Music Suites & Vocal Tracking Booths',
    subtitle:
      'Precision listening environments with floating vocal isolation booths, Neumann microphones, analog outboard gear, and comfortable creative lounges.',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2000&q=85',
    category: 'Music Suite',
    rate: '$50',
    location: 'East Austin Creative Quarter, Austin',
    specs: '1,200 sq ft · Floating Floor · Focal SM9 Monitoring',
  },
  {
    id: 4,
    indexTag: '04 // BROADCAST PODCAST LOUNGE',
    title: '4K Multi-Cam Broadcast Lounges for Visionaries',
    subtitle:
      'Turnkey multi-camera podcast studios with Shure SM7B arrays, live video switching, cinematic RGB backlighting, and instant cloud master export.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2000&q=85',
    category: 'Podcast Lounge',
    rate: '$75',
    location: 'River North Design District, Chicago',
    specs: '950 sq ft · 4x Sony FX3 · Rodecaster Pro II',
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full pt-4 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white border border-neutral-800 shadow-2xl min-h-[640px] lg:min-h-[700px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 p-6 sm:p-10 flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-xs font-mono tracking-wider text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>KURA // ARCHITECTURAL PRODUCTION SPACES</span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span>0{current + 1}</span>
              <span className="text-neutral-600">/</span>
              <span>0{slides.length}</span>
            </div>
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <span>{slides[current].indexTag}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-2xl"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
              <div className="px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-500">Rate:</span>{' '}
                <span className="text-white font-semibold">{slides[current].rate} / hr</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-500">Location:</span>{' '}
                <span className="text-neutral-200">{slides[current].location}</span>
              </div>
              <div className="hidden md:inline-flex px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur border border-neutral-800">
                <span className="text-neutral-500">Specs:</span>{' '}
                <span className="text-neutral-200">{slides[current].specs}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-md group"
              >
                <span>Explore All Studios</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-700/80 bg-neutral-900/60 backdrop-blur hover:bg-neutral-800 text-white transition-all"
              >
                <span>List A Studio Space</span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 p-6 sm:p-10 border-t border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className="group py-2 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      current === idx
                        ? 'w-10 bg-amber-500'
                        : 'w-4 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80">
            <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">50+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Verified Creative Spaces</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80">
            <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">100%</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Collision-Proof Booking</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80">
            <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">4.92★</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Average Creator Rating</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80">
            <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">$1M</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Host Liability Protection</p>
          </div>
        </div>

      </div>
    </section>
  );
};