'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

const dummyNotifications = [
  {
    id: 1,
    message: "Your video '5 Money Habits' has reached 1M views!",
    time: '2 hours ago'
  },
  { id: 2, message: "New comment on 'Crypto Investing 101'", time: '5 hours ago' },
  {
    id: 3,
    message: "Your video 'Stock Market Crash Coming?' is trending!",
    time: '1 day ago'
  },
  { id: 4, message: 'Reminder: Schedule your next video upload', time: '2 days ago' }
];

export function Appbar() {
  const { data: session } = useSession();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="w-1/3">
          <Input
            type="search"
            placeholder="Search..."
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Sheet
            open={isNotificationOpen}
            onOpenChange={setIsNotificationOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Bell className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {dummyNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className="mb-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Avatar>
            <AvatarImage
              src={session?.user?.image || ''}
              alt="User avatar"
            />
            <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
