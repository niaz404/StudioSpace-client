import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryBrowse } from '@/components/home/CategoryBrowse';
import { FeaturedStudios } from '@/components/home/FeaturedStudios';
import { HowBookingWorksSection, HostGuaranteeSection } from '@/components/home/HomeExtraSections';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full space-y-2">
      <HeroSlider />

      <CategoryBrowse />

      <FeaturedStudios />

      <HowBookingWorksSection />

      <HostGuaranteeSection />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 p-8 sm:p-12 lg:p-14 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              Host on StudioSpace
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
              List Your Creative Space
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Turn unused studio time into recurring production revenue. Connect directly with verified photographers, commercial filmmakers, podcasters, and musicians in your city.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm group"
              >
                <span>List Your Space</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
              >
                <span>Learn How Hosting Works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}