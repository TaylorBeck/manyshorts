'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Image, Settings, Video, Zap } from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: Video, label: 'Videos', href: '/videos' },
  { icon: Image, label: 'Images', href: '/images' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Zap, label: 'Upgrade', href: '/upgrade' }
];

export function Sidebar() {
  const [selectedRoute, setSelectedRoute] = useState('Videos');

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="flex flex-col h-full">
        <div className="p-5">
          <h1 className="text-2xl font-bold">ManyShorts</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            {sidebarItems.map(item => (
              <li key={item.label}>
                <Link href={item.href}>
                  <span
                    className={`flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${
                      selectedRoute === item.label ? 'bg-gray-100 font-semibold' : ''
                    }`}
                    onClick={() => setSelectedRoute(item.label)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-5">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
