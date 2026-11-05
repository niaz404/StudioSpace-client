# StudioSpace — Creative Workspace Sharing Platform
**Assignment Submission:** B14-A8-Cat_Harry  
**Live Website URL:** [https://studio-space-client-virid.vercel.app](https://studio-space-client-virid.vercel.app)  
**Live Server API:** [https://studiospace-server-akpa.onrender.com](https://studiospace-server-akpa.onrender.com)  
**Client Repository:** [https://github.com/niaz404/StudioSpace-client](https://github.com/niaz404/StudioSpace-client)  
**Server Repository:** [https://github.com/niaz404/StudioSpace-server](https://github.com/niaz404/StudioSpace-server)

---

## 🌟 Top 5 Website Features

1. **Dynamic Studio Discovery & Multi-Param Filtering:** Creators can discover daylight cyc walls, cinema sound stages, 4K podcast lounges, and music recording suites with live category filters, search by keyword, price range slider, and sorting.
2. **Challenge 1 — JWT Security & Token Authorization:** All sensitive actions (adding spaces, editing, deleting, making reservations) are secured with JSON Web Tokens and verified against unauthorized access (401 Unauthorized).
3. **Challenge 2 — Real-Time Double-Booking Prevention:** An intelligent interval collision check ensures creators cannot book an overlapping time slot for an already-reserved studio on the same date.
4. **Challenge 3 — Instant Light / Dark Theme Customization:** A one-click theme switcher in the navbar toggles between darkroom mode and high-contrast light mode with automatic persistent storage in `localStorage`.
5. **Downloadable PDF Booking Invoices (Optional Feature):** One-click printable and downloadable PDF receipts generated using `jsPDF` on the My Bookings page with itemized hours, deposit, and host details.
6. **Saved Studios Wishlist (Optional Feature):** Creators can bookmark their favorite creative workspaces directly to MongoDB with heart icon toggles on any studio card.

---

## 🛠 Tech Stack

| Layer | Technologies Selected |
|---|---|
| **FrontEnd Framework** | Next.js 15 (App Router), React 19, Pure JavaScript (JSX) |
| **Styling & Theme** | Tailwind CSS v4, Dark/Light Mode with CSS Variables |
| **Icons & Notifications** | Lucide React, Sonner Toasts (No native alerts) |
| **Animations** | Framer Motion |
| **PDF Generation** | jsPDF |
| **State Management** | React Context API (`AuthContext`, `ThemeContext`, `WishlistContext`) |

---

## ⚙️ Local Setup Guide

Follow these simple steps to run the client locally on your computer:

### 1. Open your terminal in the client directory:
```bash
cd client
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Check environment configuration:
A `.env.local` template is provided (`.env.example`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Firebase Authentication (Google OAuth)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 4. Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Production build test:
```bash
npm run build
npm run start
```

---

## 🔑 Examiner Test Credentials

Use these pre-seeded test accounts to test all website features immediately:

| Account Role | Email Address | Password | Capabilities |
|---|---|---|---|
| **Examiner / Creator** | `creator@studiospace.io` | `StudioPassword123` | Book studios, view bookings, cancel slots, download PDF invoices, save to wishlist |
| **Studio Host** | `alex.director@studiospace.io` | `StudioHost123` | Manage owned studio listings, edit spaces, delete listings with confirmation |

> 💡 **Quick Tip:** On the Login page (`/login`), click the **"Auto-Fill"** button next to the Examiner Test Account badge to fill in credentials with one click!
