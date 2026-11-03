'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const WishlistContext = createContext();

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [savedIds, setSavedIds] = useState([]);

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setSavedIds([]);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/wishlist/ids`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setSavedIds(data.ids || []);
      }
    } catch (e) {}
  }, [user, token]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const isSaved = (studioId) => {
    return savedIds.includes(studioId);
  };

  const toggleWishlist = async (studioId) => {
    if (!user) {
      toast.error('Please log in to save studios to your wishlist.');
      return false;
    }

    try {
      const res = await fetch(`${API_BASE}/wishlist/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ studioId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Could not update wishlist.');
        return false;
      }

      if (data.saved) {
        setSavedIds((prev) => [...prev, studioId]);
        toast.success(data.message || 'Studio saved to your wishlist!');
      } else {
        setSavedIds((prev) => prev.filter((id) => id !== studioId));
        toast.info(data.message || 'Removed from wishlist.');
      }
      return true;
    } catch (e) {
      toast.error('Network error updating wishlist.');
      return false;
    }
  };

  return (
    <WishlistContext.Provider value={{ savedIds, isSaved, toggleWishlist, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
