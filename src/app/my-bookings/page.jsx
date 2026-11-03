'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import {
  Calendar,
  Clock,
  CalendarX,
  FileDown,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MyBookingsPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bookings/my`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.data || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;
    setCancelling(true);
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingToCancel._id}/cancel`, {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to cancel booking.');
        return;
      }

      toast.success(data.message || 'Booking reservation cancelled.');
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingToCancel._id ? { ...b, status: 'Cancelled' } : b))
      );
      setCancelModalOpen(false);
      setBookingToCancel(null);
    } catch (err) {
      toast.error('Network error during booking cancellation.');
    } finally {
      setCancelling(false);
    }
  };

  const generatePDFInvoice = (booking) => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('StudioSpace', 14, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL BOOKING CONFIRMATION & INVOICE', 14, 30);

      doc.setFontSize(9);
      doc.text(`Invoice ID: #INV-${booking._id.slice(-8).toUpperCase()}`, 140, 22);
      doc.text(`Issued: ${new Date().toLocaleDateString()}`, 140, 28);

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Reservation Details', 14, 55);

      doc.setDrawColor(226, 232, 240);
      doc.line(14, 58, 196, 58);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Studio Workspace:`, 14, 68);
      doc.setFont('helvetica', 'bold');
      doc.text(`${booking.studioTitle || 'Creative Studio'}`, 55, 68);

      doc.setFont('helvetica', 'normal');
      doc.text(`Shoot Date:`, 14, 76);
      doc.setFont('helvetica', 'bold');
      doc.text(`${booking.date}`, 55, 76);

      doc.setFont('helvetica', 'normal');
      doc.text(`Production Hours:`, 14, 84);
      doc.setFont('helvetica', 'bold');
      doc.text(`${booking.startTime} - ${booking.endTime} (${booking.totalHours} hrs)`, 55, 84);

      doc.setFont('helvetica', 'normal');
      doc.text(`Reserved By:`, 14, 92);
      doc.setFont('helvetica', 'bold');
      doc.text(`${booking.userName} (${booking.userEmail})`, 55, 92);

      doc.setFont('helvetica', 'normal');
      doc.text(`Booking Status:`, 14, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(`${booking.status}`, 55, 100);

      doc.setFontSize(14);
      doc.text('Financial Breakdown', 14, 118);
      doc.line(14, 121, 196, 121);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Hourly Subtotal (${booking.totalHours} hrs):`, 14, 131);
      doc.text(`$${booking.totalAmount}.00`, 170, 131);

      doc.text(`Refundable Security Deposit:`, 14, 139);
      doc.text(`$${booking.securityDeposit || 0}.00`, 170, 139);

      doc.setDrawColor(15, 23, 42);
      doc.line(14, 146, 196, 146);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Amount:`, 14, 155);
      doc.text(`$${Number(booking.totalAmount) + Number(booking.securityDeposit || 0)}.00`, 170, 155);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('StudioSpace Inc. • Verified Peer-to-Peer Production Marketplace', 14, 275);
      doc.text('Thank you for reserving through StudioSpace.', 14, 280);

      doc.save(`StudioSpace-Booking-${booking._id.slice(-6)}.pdf`);
      toast.success('Invoice PDF downloaded.');
    } catch (err) {
      toast.error('Failed to generate PDF document.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 mr-1" />
            Pending Confirmation
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Completed
          </span>
        );
      case 'Cancelled':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700">
            Cancelled
          </span>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-500">
              Creator Dashboard
            </p>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              My Studio Bookings
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Track upcoming shoot sessions, view reservation statuses, and download invoice PDFs.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <span>Explore More Studios</span>
          </Link>
        </div>

        {loading ? (
          <div className="py-16 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <CalendarX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              No Studio Bookings Found
            </h3>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              You haven&apos;t reserved any studios yet. Explore available photo lofts, sound stages, and podcast rooms.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/studios"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <span>Browse Studios</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                    <img src={booking.studioImage || booking.studio?.image} alt={booking.studioTitle} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
                        {booking.studioTitle}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1 font-semibold text-neutral-900 dark:text-neutral-100">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {booking.startTime} - {booking.endTime} ({booking.totalHours} hrs)
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs pt-0.5">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        Total: ${booking.totalAmount}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-neutral-500">
                        Deposit: ${booking.securityDeposit || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
                  <button
                    onClick={() => generatePDFInvoice(booking)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-amber-500" />
                    <span>Download Invoice</span>
                  </button>

                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => {
                        setBookingToCancel(booking);
                        setCancelModalOpen(true);
                      }}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    >
                      <CalendarX className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {cancelModalOpen && bookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-neutral-900 dark:text-white">
                Cancel Studio Booking?
              </h3>
              <p className="mt-2 text-xs text-center text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Are you sure you want to cancel your slot for <span className="font-semibold text-neutral-900 dark:text-white">&ldquo;{bookingToCancel.studioTitle}&rdquo;</span> on {bookingToCancel.date}?
              </p>

              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setCancelModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancelBooking}
                  className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {cancelling ? 'Cancelling...' : 'Confirm Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
