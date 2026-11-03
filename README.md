# StudioSpace — Peer-to-Peer Creative Workspace Platform

> A high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Built cleanly with **Next.js 15 (App Router)** and **React 19** in pure, comfortable **JavaScript**.

**Live Website URL:** [https://studiospace-platform.vercel.app](https://studiospace-platform.vercel.app) *(Deploy URL placeholder)*  
**Server Backend API:** `../server` (Express.js, MongoDB, JWT)

---

## 🌟 Top 5 Website Features

1. **Dynamic Studio Discovery & Multi-Param Filtering:** Creators can discover photo cyc walls, cinema soundstages, 4K podcast lounges, and Dolby music tracking suites with real-time category filtering, keyword search, hourly rate sliders, and sorting.
2. **Challenge 1 — JWT Security with HTTPOnly Cookie Protection:** All server mutations (creating listings, modifying slots, bookings) are secured with HTTPOnly cookies and Bearer tokens, rejecting unauthorized requests with 401 Unauthorized.
3. **Challenge 2 — Real-Time Double-Booking Collision Prevention:** Time interval collision algorithm `(requestedStart < existingEnd && requestedEnd > existingStart)` checking existing confirmed/pending reservations in MongoDB to prevent double-booking.
4. **Challenge 3 — Dark & Light Theme Customization:** Instant full-app theme toggle with persistent storage in `localStorage` supporting both sleek studio darkroom mode and high-contrast light mode.
5. **Downloadable PDF Booking Invoices (Optional Feature):** One-click printable and downloadable PDF receipts generated using `jspdf` on the My Bookings page with itemized hours, security deposits, and host details.
6. **Saved Studios Wishlist (Optional Feature):** Direct bookmarking system allowing logged-in creators to save favorite studios to MongoDB with heart icon badges.

---

## 🛠 Tech Stack

| Layer | Technologies Selected |
|---|---|
| **FrontEnd Framework** | Next.js 15 (App Router), React 19, Pure JavaScript (JSX) |
| **Styling & Theme** | Tailwind CSS v4, Custom CSS Variables (Light/Dark Mode) |
| **Icons & Notifications** | Lucide React, Sonner Toast Notifications (No native alert) |
| **PDF Generation** | jsPDF |
| **State Management** | React Context API (`AuthContext`, `ThemeContext`, `WishlistContext`) |

---

## ⚙️ Local Setup Steps

1. **Navigate to the client folder:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   A `.env.local` file is already created for you:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔑 Examiner Test Credentials

Use these pre-seeded test accounts for fast grading:

| Role | Email Address | Password | Capabilities |
|---|---|---|---|
| **Examiner / Creator** | `creator@studiospace.io` | `StudioPassword123` | Book studios, download PDF invoices, save to wishlist, cancel slots |
| **Studio Host** | `alex.director@studiospace.io` | `StudioHost123` | Create new studios, edit listings, delete owned studios |

> **Password Policy Validated:**
> - At least 6 characters long
> - Contains at least one uppercase letter `[A-Z]`
> - Contains at least one lowercase letter `[a-z]`
