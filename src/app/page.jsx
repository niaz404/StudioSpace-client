import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryBrowse } from '@/components/home/CategoryBrowse';
import { FeaturedStudios } from '@/components/home/FeaturedStudios';
import { HowBookingWorksSection, HostGuaranteeSection } from '@/components/home/HomeExtraSections';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full space-y-4">
      <HeroSlider />

      <CategoryBrowse />

      <FeaturedStudios />

      <HowBookingWorksSection />

      <HostGuaranteeSection />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-0" />
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>MONETIZE OPEN PRODUCTION HOURS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              List Your Creative Space
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Turn unused studio time into recurring production revenue. Connect directly with vetted commercial filmmakers, photographers, and audio engineers seeking spaces in your city.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm group"
              >
                <span>List Your Space</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
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