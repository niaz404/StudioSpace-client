import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'KURA // StudioSpace — Peer-to-Peer Production Studios',
  description:
    'Discover and book daylight photography cyc walls, cinema sound stages, podcast lounges, and music suites with transparent hourly pricing.',
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