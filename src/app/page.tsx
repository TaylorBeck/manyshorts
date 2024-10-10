'use client';

import { useSession } from 'next-auth/react';
import ShortGeneratorForm from '@/components/ShortGeneratorForm';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">ManyShorts</h1>
      {session ? (
        <ShortGeneratorForm />
      ) : (
        <div className="space-y-4">
          <p className="text-xl">Please log in to generate shorts</p>
          <Button asChild>
            <a href="/sign-in">Log in</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/sign-up">Sign up</a>
          </Button>
        </div>
      )}
    </div>
  );
}
