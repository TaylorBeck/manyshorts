import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ManyShorts',
  description: 'Create and share AI-generated YouTube Shorts'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col !min-h-screen">
            <main className="flex-grow">{children}</main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
