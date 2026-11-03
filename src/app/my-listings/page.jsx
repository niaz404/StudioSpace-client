'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { toast } from 'sonner';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  AlertTriangle,
  Building,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MyListingsPage() {
  const { user, token } = useAuth();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUserStudios = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/studios/user/${encodeURIComponent(user.email)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setStudios(data.data || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchUserStudios();
  }, [fetchUserStudios]);

  const confirmDelete = (studio) => {
    setStudioToDelete(studio);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!studioToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/studios/${studioToDelete._id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to delete studio.');
        return;
      }

      toast.success(data.message || 'Studio listing deleted successfully.');
      setStudios((prev) => prev.filter((s) => s._id !== studioToDelete._id));
      setDeleteModalOpen(false);
      setStudioToDelete(null);
    } catch (err) {
      toast.error('Network error during deletion.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-500">
              Host Dashboard
            </p>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              My Studio Listings
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Manage your published creative workspaces and update availability or rates.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Studio</span>
          </Link>
        </div>

        {loading ? (
          <div className="py-16 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700"
              />
            ))}
          </div>
        ) : studios.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <Building className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              No Studio Listings Yet
            </h3>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              You haven&apos;t listed any creative workspaces yet. Publish your first photo cyc wall, soundstage, or podcast room today.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/add-studio"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>List Your First Studio</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {studios.map((s) => (
              <div
                key={s._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all gap-5"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-black/75 text-white">
                      {s.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-base text-neutral-900 dark:text-white line-clamp-1">
                        {s.title}
                      </h3>
                      <div className="flex items-center text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                        <span>{s.rating ? Number(s.rating).toFixed(1) : '5.0'}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
                      <span className="truncate max-w-xs">{s.location}</span>
                    </div>

                    <div className="flex items-center space-x-3 pt-1 text-xs">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        ${s.hourlyRate} / hr
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Up to {s.maxCapacity} people
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {s.squareFeet || 950} sq ft
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center w-full md:w-auto justify-end">
                  <Link
                    href={`/studios/${s._id}`}
                    target="_blank"
                    className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="View Public Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/studios/edit/${s._id}`}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => confirmDelete(s)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteModalOpen && studioToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-neutral-900 dark:text-white">
                Delete Studio Workspace?
              </h3>
              <p className="mt-2 text-xs text-center text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-neutral-900 dark:text-white">&ldquo;{studioToDelete.title}&rdquo;</span>? This will permanently remove the listing from StudioSpace.
              </p>

              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {deleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
