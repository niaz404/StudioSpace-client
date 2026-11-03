'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { toast } from 'sonner';
import {
  DollarSign,
  MapPin,
  Image as ImageIcon,
  Check,
  ArrowLeft,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const defaultAmenities = [
  '24ft Infinity Cyc Wall',
  'Profoto Strobes & Modifiers',
  'Acoustic Sound Isolation',
  '4K Multi-Camera Rigs',
  'Shure SM7B Broadcast Mics',
  'Overhead DMX Lighting Grid',
  'Green Screen Cyc Backdrop',
  'Hair & Makeup Vanity Station',
  'Private Green Room / Lounge',
  'Drive-In Elephant Doors',
  'High-Output Silent HVAC',
  'Gigabit Fiber Wi-Fi',
  'Nespresso Bar & Kitchenette',
  'Wardrobe Racks & Steamer',
];

export default function EditStudioPage({ params }) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;
  const router = useRouter();
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Photo Studio');
  const [hourlyRate, setHourlyRate] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [overview, setOverview] = useState('');

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`${API_BASE}/studios/${studioId}`);
        if (!res.ok) {
          toast.error('Could not locate studio listing.');
          router.push('/my-listings');
          return;
        }

        const data = await res.json();
        const s = data.data;

        if (user && s.ownerEmail !== user.email && user.role !== 'admin') {
          toast.error('You do not have permission to edit this listing.');
          router.push('/my-listings');
          return;
        }

        setTitle(s.title || '');
        setCategory(s.category || 'Photo Studio');
        setHourlyRate(s.hourlyRate || '');
        setSecurityDeposit(s.securityDeposit || 0);
        setMaxCapacity(s.maxCapacity || 10);
        setSquareFeet(s.squareFeet || 950);
        setLocation(s.location || '');
        setImage(s.image || '');
        setSelectedAmenities(s.amenities || []);
        setOverview(s.overview || '');
      } catch (err) {
        toast.error('Error loading studio data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId, user, router]);

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !category || !hourlyRate || !location || !image || !overview) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/studios/${studioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          category,
          hourlyRate: Number(hourlyRate),
          securityDeposit: Number(securityDeposit || 0),
          maxCapacity: Number(maxCapacity || 10),
          squareFeet: Number(squareFeet || 950),
          location,
          image,
          galleryImages: [image],
          amenities: selectedAmenities,
          overview,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to update studio.');
        return;
      }

      toast.success('Studio listing updated successfully!');
      router.push('/my-listings');
    } catch (err) {
      toast.error('Network error updating studio.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-96 w-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <button
          onClick={() => router.push('/my-listings')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-500 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Listings</span>
        </button>

        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-500">
            Listing Editor
          </p>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Update Studio Listing
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Modify workspace details, hourly pricing, or studio amenities.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Studio Details & Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Studio Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Photo Studio">Photo Studio (Cyc Walls / Daylight)</option>
                  <option value="Film Stage">Film Stage (Acoustic Soundstage)</option>
                  <option value="Podcast Lounge">Podcast Lounge (Multi-Cam 4K)</option>
                  <option value="Music Suite">Music Suite (Dolby Atmos / Tracking)</option>
                  <option value="Workshop">Workshop (Artisan & Maker)</option>
                  <option value="Art Studio">Art Studio (Screenprint & Canvas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Location Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>Pricing & Specs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Hourly Rate ($/hr) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Max Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Floor Size (sq ft)
                </label>
                <input
                  type="number"
                  min="50"
                  value={squareFeet}
                  onChange={(e) => setSquareFeet(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>Studio Visuals</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Main Image URL *
              </label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {image && (
              <div className="mt-3 relative w-full h-48 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Studio Amenities & Equipment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {defaultAmenities.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      selected
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                        : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{amenity}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                        selected
                          ? 'bg-amber-500 border-amber-500 text-white'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Detailed Overview & Guidelines *
            </h2>
            <textarea
              required
              rows={4}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/my-listings')}
              className="px-6 py-3 rounded-full text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
            >
              {submitting ? 'Saving...' : 'Save & Update Studio'}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
