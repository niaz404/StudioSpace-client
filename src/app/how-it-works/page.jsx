'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  CheckCircle2,
  Video,
  ShieldCheck,
  CreditCard,
  Building2,
  ArrowUpRight,
} from 'lucide-react';

export default function HowItWorksPage() {
  const creatorSteps = [
    {
      step: '01',
      title: 'Find Your Space',
      desc: 'Filter by cyclorama cyc walls, acoustics, daylight exposure, ceiling height, and equipment packages.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Pick Your Hours',
      desc: 'Check live calendar availability and choose your exact shoot hours with transparent pricing and no surprises.',
      icon: Calendar,
    },
    {
      step: '03',
      title: 'Book Instantly',
      desc: 'Lock in your reservation with host confirmation and protected payment processing.',
      icon: CheckCircle2,
    },
    {
      step: '04',
      title: 'Create & Shoot',
      desc: 'Arrive on set, access host amenities, and bring your vision to life under our verified host protection.',
      icon: Video,
    },
  ];

  const hostSteps = [
    {
      step: '01',
      title: 'List Your Studio',
      desc: 'Upload high-resolution photography, specify available grip and lighting gear, and set your hourly rates.',
      icon: Building2,
    },
    {
      step: '02',
      title: 'Accept Bookings',
      desc: 'Review incoming requests from verified photographers, filmmakers, and creators with calendar control.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Earn Reliably',
      desc: 'Generate predictable revenue from open studio slots with automated payouts and deposit protection.',
      icon: CreditCard,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>PRODUCTION WORKFLOW</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight">
          How StudioSpace Operates
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          A peer-to-peer marketplace engineered specifically for production efficiency. Discover how simple it is to book production hours or monetize your creative space.
        </p>
      </div>

      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-500">
            For Creators & Production Crews
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Reserve Your Ideal Set in 4 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatorSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    STEP {s.step}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-semibold text-base text-neutral-900 dark:text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-500">
            For Studio Owners & Stage Hosts
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Monetize Empty Studio Hours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    STAGE {s.step}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-semibold text-base text-neutral-900 dark:text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ready to book your next set?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Discover premier photo cyc stages, video production warehouses, podcast studios, and audio rooms in your area.
          </p>
        </div>
        <Link
          href="/studios"
          className="px-7 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs flex items-center space-x-2 transition-colors shrink-0 uppercase tracking-wider group shadow-sm"
        >
          <span>Explore Studios</span>
          <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}