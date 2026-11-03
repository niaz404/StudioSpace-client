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
    title: 'Discover Spaces',
    desc: 'Browse photo cyc walls, sound stages, podcast rooms, and audio suites with verified dimensions and lighting packages.',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Select Production Hours',
    desc: 'Choose your production dates and hours with live availability, transparent pricing, and zero double-booking.',
    icon: Clock,
  },
  {
    num: '03',
    title: 'Book Instantly',
    desc: 'Lock in your booking immediately with secure payment processing, host confirmation, and an itemized digital invoice.',
    icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'Create & Produce',
    desc: 'Check in with the studio host, load in your gear, tap into continuous power, and bring your creative vision to life.',
    icon: Clapperboard,
  },
];

const assurances = [
  {
    title: '$1,000,000 Liability Protection',
    desc: 'Comprehensive coverage safeguarding studio spaces, physical fixtures, and creator production equipment.',
    icon: ShieldCheck,
  },
  {
    title: 'Verified Technical Specs',
    desc: 'Accurate dimensions, ceiling heights, acoustic treatment, and power drops verified on every listing.',
    icon: BadgeCheck,
  },
  {
    title: 'Collision-Proof Escrow',
    desc: 'Strict interval collision prevention algorithms protect your production slot with automated deposit handling.',
    icon: Lock,
  },
  {
    title: '24/7 Production Support',
    desc: 'Dedicated production support available while you shoot to answer equipment questions or facilitate extended hours.',
    icon: Headphones,
  },
];

export const HowBookingWorksSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-500">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Simple 4-Step Studio Booking
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
            A frictionless workflow designed for filmmakers, commercial photographers, podcast producers, and audio engineers.
          </p>
        </div>

        <Link
          href="/how-it-works"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-amber-500 transition-colors group shrink-0"
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-5 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-500">{step.num}</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
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
    <section className="bg-neutral-100/60 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-500">
            Assurances & Protection
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Peace of Mind for Every Shoot
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
            Every booking is backed by liability coverage, transparent deposits, and verified host safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
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