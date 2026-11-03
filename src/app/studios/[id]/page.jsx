'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import {
  Star,
  MapPin,
  Heart,
  Users,
  Maximize2,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function StudioDetailsPage({ params }) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;
  const router = useRouter();
  const { user, token } = useAuth();
  const { isSaved, toggleWishlist } = useWishlist();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`${API_BASE}/studios/${studioId}`);
        if (res.ok) {
          const data = await res.json();
          setStudio(data.data);
        } else {
          toast.error('Studio workspace not found.');
        }
      } catch (err) {
        console.error('Fetch studio details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-8">
        <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-[460px] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Studio Workspace Not Found</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The creative listing you are looking for may have been removed or unpublished.
        </p>
        <Link
          href="/studios"
          className="mt-6 inline-flex px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm"
        >
          Back to Explore Studios
        </Link>
      </div>
    );
  }

  const gallery = studio.galleryImages && studio.galleryImages.length > 0 ? studio.galleryImages : [studio.image];
  const saved = isSaved(studio._id);

  const calculateTotalHours = () => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startMinutes = startH * 60 + (startM || 0);
    const endMinutes = endH * 60 + (endM || 0);
    const diff = (endMinutes - startMinutes) / 60;
    return diff > 0 ? diff : 0;
  };

  const totalHours = calculateTotalHours();
  const subtotal = totalHours * studio.hourlyRate;
  const deposit = studio.securityDeposit || 0;
  const totalAmount = subtotal;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);

    if (!user) {
      toast.error('Please log in to reserve this creative studio.');
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }

    if (totalHours <= 0) {
      setBookingError('End time must be later than start time.');
      return;
    }

    setBookingSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          studioId: studio._id,
          date: bookingDate,
          startTime,
          endTime,
          totalHours,
          totalAmount,
          securityDeposit: deposit,
          specialRequests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {

        setBookingError(data.message || 'Unable to complete reservation.');
        toast.error(data.message || 'Booking conflict or submission error.');
        return;
      }

      toast.success(data.message || 'Studio booking request submitted successfully!');
      setBookingModalOpen(false);
      router.push('/my-bookings');
    } catch (err) {
      console.error('Booking submission error:', err);
      setBookingError('Network error connecting to booking service.');
      toast.error('Network error connecting to server.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-amber-500">Home</Link>
        <span>/</span>
        <Link href="/studios" className="hover:text-amber-500">Explore Studios</Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 truncate">{studio.title}</span>
      </div>

      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {studio.category}
            </span>
            <div className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>{studio.rating ? Number(studio.rating).toFixed(1) : '5.0'}</span>
              <span className="text-slate-400">({studio.reviewCount || 1} reviews)</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {studio.title}
          </h1>
          <div className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            <MapPin className="w-4 h-4 mr-1 text-amber-500 flex-shrink-0" />
            <span>{studio.location}</span>
          </div>
        </div>

        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleWishlist(studio._id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              saved
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/30'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            <span>{saved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
          </button>
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden bg-slate-950 shadow-xl">
          <img
            src={gallery[activeImageIdx]}
            alt={studio.title}
            className="w-full h-full object-cover"
          />

          
          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                aria-label="Previous Photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev + 1) % gallery.length)}
                aria-label="Next Photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold">
            {activeImageIdx + 1} / {gallery.length} Photos
          </div>
        </div>

        
        {gallery.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === activeImageIdx ? 'border-amber-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Capacity</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 mt-1">
                <Users className="w-4 h-4 text-amber-500" />
                Up to {studio.maxCapacity} people
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Floor Area</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 mt-1">
                <Maximize2 className="w-4 h-4 text-amber-500" />
                {studio.squareFeet || 950} sq ft
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Hourly Rate</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-1">
                ${studio.hourlyRate} <span className="text-neutral-400 font-normal text-xs">/ hr</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Security Deposit</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                ${studio.securityDeposit || 0}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Workspace Overview</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
              {studio.overview}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Studio Amenities & Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studio.amenities && studio.amenities.length > 0 ? (
                studio.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400">Standard studio production amenities included.</p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={studio.ownerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={studio.ownerName}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Workspace Host</p>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">{studio.ownerName}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{studio.ownerEmail}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Host</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Creator Reviews</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">Jordan Diaz</p>
                      <p className="text-[11px] text-neutral-400">Cinematographer • 2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  &ldquo;Acoustic treatment on this stage is excellent. We tracked crystal clear production dialogue during a stormy day outside. Lighting grid was pre-rigged and host was extremely responsive.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex items-baseline justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-3xl font-bold text-neutral-900 dark:text-white">${studio.hourlyRate}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">/ hour</span>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Instant Booking
              </div>
            </div>

            <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="font-semibold text-neutral-900 dark:text-white">${studio.securityDeposit || 0} (Refundable)</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Session</span>
                <span className="font-semibold text-neutral-900 dark:text-white">2 Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation</span>
                <span className="font-semibold text-neutral-900 dark:text-white">Free cancellation up to 48 hrs</span>
              </div>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              Book Workspace Now
            </button>

            <p className="text-[11px] text-center text-neutral-400">
              You won&apos;t be charged until host confirms availability.
            </p>
          </div>
        </div>
      </div>

      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Reserve Studio</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs">{studio.title}</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                aria-label="Close booking modal"
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingError && (
              <div className="mt-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start space-x-3 text-red-600 dark:text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Booking Notice</p>
                  <p className="mt-0.5 leading-relaxed">{bookingError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Production Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Wrap Time (End)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Production Notes & Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Bringing cinema lenses, hair & makeup crew arrives 30 mins early..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Total Duration:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{totalHours > 0 ? `${totalHours} Hours` : 'Invalid interval'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">${studio.hourlyRate} x {totalHours} hrs:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Security Deposit:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">${deposit}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between font-bold text-sm text-neutral-900 dark:text-white">
                  <span>Total Due:</span>
                  <span className="text-amber-500">${totalAmount}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingSubmitting || totalHours <= 0}
                  className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                >
                  {bookingSubmitting ? 'Confirming...' : 'Confirm Studio Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

