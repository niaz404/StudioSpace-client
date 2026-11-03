'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { MapPin, Star, Heart, ArrowUpRight, Users, Maximize2 } from 'lucide-react';

export const StudioCard = ({ studio, index = 0 }) => {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(studio._id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(studio._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-neutral-950/80"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={studio.image}
          alt={studio.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-neutral-950/80 text-white backdrop-blur-md border border-neutral-700/50">
            {studio.category}
          </span>
          {studio.squareFeet && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50">
              {studio.squareFeet} sq ft
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={handleHeartClick}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-sm ${
            saved
              ? 'bg-rose-500 text-white'
              : 'bg-neutral-950/60 text-white/90 hover:text-rose-400 hover:scale-105'
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </motion.button>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-white/95 font-medium drop-shadow-sm">
          <div className="flex items-center space-x-1 truncate max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate text-[11px] font-mono">{studio.location}</span>
          </div>

          <div className="flex items-center space-x-1 bg-neutral-950/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-neutral-700/50">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-mono font-semibold">{studio.rating ? Number(studio.rating).toFixed(1) : '4.9'}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white line-clamp-2 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {studio.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {studio.description || studio.overview || 'Professional creative production space featuring dedicated equipment packages and verified host support.'}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Hourly Rate</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">/ hr</span>
            </div>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-neutral-950 transition-colors duration-200"
          >
            <span>View Space</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};