import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'StudioSpace — Peer-to-Peer Creative Workspaces & Production Studios',
  description:
    'Discover and book daylight photography cyc walls, cinema sound stages, podcast lounges, and music suites with transparent hourly pricing.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster
                position="top-right"
                richColors
                closeButton
                theme="system"
                toastOptions={{
                  style: {
                    borderRadius: '1rem',
                  },
                }}
              />
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}