import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-amber-500 animate-spin" />
      <p className="text-xs text-neutral-400 font-medium tracking-wide">Loading...</p>
    </div>
  );
}
