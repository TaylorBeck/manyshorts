import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/Providers';
import { Sidebar } from '@/components/Sidebar';
import { Appbar } from '@/components/Appbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ManyShorts',
  description: 'Create and share AI generated YouTube Shorts'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <div className="flex h-screen bg-gray-100">
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              <Appbar />

              {/* Page content */}
              <main className="flex-1 p-8 overflow-auto">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
