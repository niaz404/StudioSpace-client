'use client';

import React from 'react';
import Link from 'next/link';
import { Target, HeartHandshake, Zap, ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '500+', label: 'Verified Studio Spaces' },
    { value: '45,000+', label: 'Production Hours Reserved' },
    { value: '99.8%', label: 'On-Time Check-In Rate' },
    { value: '$1.8M+', label: 'Earned by Studio Hosts' },
  ];

  const pillars = [
    {
      title: 'Transparent Studio Specifications',
      desc: 'No more guessing whether a space has low ceilings or power limitations. We mandate verified floor dimensions, ceiling heights, STC acoustic ratings, and lighting equipment lists on every listing.',
      icon: Target,
    },
    {
      title: 'Peer-to-Peer Production Efficiency',
      desc: 'Traditional commercial rental agencies charge steep broker commissions. StudioSpace connects creators directly with facility owners, keeping hourly rates affordable and host returns maximized.',
      icon: HeartHandshake,
    },
    {
      title: 'Collision-Proof Instant Booking',
      desc: 'Production schedules move fast. Our platform provides real-time calendar availability, instant confirmation with collision-prevention algorithms, and clear host communication.',
      icon: Zap,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>ABOUT STUDIOSPACE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight">
          Connecting Visionaries with Architectural Workspaces
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          Built for commercial directors, photographers, audio engineers, and podcast producers seeking hourly access to top-tier creative production studios with transparent pricing.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
        {stats.map((s, idx) => (
          <div key={idx} className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-500">
            Core Principles
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Engineered for Creators & Facility Hosts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-white tracking-tight">{p.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>HOST MONETIZATION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Have an architectural studio to share?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Join hundreds of photography lofts, recording facilities, and soundstages earning consistent production revenue through StudioSpace.
          </p>
        </div>
        <Link
          href="/add-studio"
          className="px-7 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs flex items-center space-x-2 transition-colors shrink-0 uppercase tracking-wider group shadow-sm"
        >
          <span>List Your Space</span>
          <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}