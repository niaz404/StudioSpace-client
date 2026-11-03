'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  Clock,
  CheckCircle2,
  Clapperboard,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Headphones,
  ArrowUpRight,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    code: 'DISCOVER',
    title: 'Explore & Inspect',
    desc: 'Browse architectural photo lofts, calibrated sound stages, and audio suites with verified dimensions, ceiling heights, and equipment packages.',
    icon: Compass,
  },
  {
    num: '02',
    code: 'RESERVE',
    title: 'Select Production Hours',
    desc: 'Choose your production dates and hours with instant live availability, zero double-booking, and transparent pricing.',
    icon: Clock,
  },
  {
    num: '03',
    code: 'CONFIRM',
    title: 'Instant Confirmation',
    desc: 'Lock in your booking immediately with secure payment processing, host approval guarantee, and an itemized digital invoice.',
    icon: CheckCircle2,
  },
  {
    num: '04',
    code: 'CREATE',
    title: 'Arrive & Produce',
    desc: 'Check in with the studio host, load in through dedicated access doors, tap into continuous 3-phase power, and execute your vision.',
    icon: Clapperboard,
  },
];

const assurances = [
  {
    num: '01',
    title: '$1,000,000 Liability Shield',
    desc: 'Comprehensive coverage safeguarding studio spaces, physical fixtures, and expensive creator equipment during all booked shoot hours.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Verified Technical Specs',
    desc: 'Rigorous studio verification ensuring actual square footage, acoustic isolation ratings, and power drops match the listing exactly.',
    icon: BadgeCheck,
  },
  {
    num: '03',
    title: 'Collision-Proof Escrow',
    desc: 'Strict interval collision prevention algorithms protect your production slot, with immediate security deposit release upon clean wrap.',
    icon: Lock,
  },
  {
    num: '04',
    title: '24/7 Production Concierge',
    desc: 'Dedicated creative production support on call while you shoot to answer equipment questions or facilitate extended hours.',
    icon: Headphones,
  },
];

export const HowBookingWorksSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>HOW IT OPERATES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Streamlined Creative Production Flow
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl font-normal leading-relaxed">
            Designed for commercial directors, independent photographers, podcast producers, and audio engineers.
          </p>
        </div>

        <Link
          href="/how-it-works"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors group shrink-0"
        >
          <span>Detailed Workflow Guide</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 rounded-3xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">{step.num} // {step.code}</span>
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export const HostGuaranteeSection = () => {
  return (
    <section className="bg-neutral-100/60 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800/80 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>GUARANTEES & PROTECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Security for Hosts & Creators Alike
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            Every booking is backed by comprehensive coverage, transparent escrow settlements, and verified host safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};