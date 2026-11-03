'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to KURA // StudioSpace updates!');
    setEmail('');
  };

  const categories = [
    { name: 'Photo Studios (Cyc Walls)', href: '/studios?category=Photo%20Studio' },
    { name: 'Film Stages & Soundstages', href: '/studios?category=Film%20Stage' },
    { name: 'Broadcast Podcast Lounges', href: '/studios?category=Podcast%20Lounge' },
    { name: 'Dolby Music & Mixing Suites', href: '/studios?category=Music%20Suite' },
    { name: 'Artisan Workshop Lofts', href: '/studios?category=Workshop' },
  ];

  const quickLinks = [
    { name: 'Discover Studios', href: '/studios' },
    { name: 'List Your Space', href: '/add-studio' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
    { name: 'Saved Wishlist', href: '/wishlist' },
  ];

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-amber-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                  <line x1="9.69" y1="8" x2="21.17" y2="8" />
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                  <line x1="14.31" y1="16" x2="2.83" y2="16" />
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                  KURA <span className="font-light text-neutral-400">/</span> <span className="text-amber-500">StudioSpace</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium -mt-0.5">
                  Production Workspaces
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed font-sans">
              KURA // StudioSpace is a peer-to-peer creative workspace platform connecting photographers, filmmakers, podcasters, and musicians with production studios, sound stages, and rehearsal rooms.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold">
              Categories
            </p>
            <ul className="space-y-2.5 text-xs">
              {categories.map((c) => (
                <li key={c.name}>
                  <Link
                    href={c.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold">
              Platform
            </p>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((q) => (
                <li key={q.name}>
                  <Link
                    href={q.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {q.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold">
              Creator Dispatch
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
              Subscribe to newly listed soundstages, cyc walls, and special off-peak rates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@production.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-amber-500 text-neutral-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-4">
          <p className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} KURA // StudioSpace Platform · B14-A8-Cat_Harry. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-[11px] font-mono">
            <span>Next.js 15 App Router</span>
            <span>Tailwind CSS v4</span>
            <span>MongoDB Atlas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};