'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Sign Up Successful',
          description: 'Welcome to ManyShorts!'
        });
        router.push('/sign-in');
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign Up Failed',
          description: data.error
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:grid md:grid-cols-2 h-screen overflow-hidden">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="mx-8 md:mx-auto grid w-full md:w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Get Started</h1>
            <p className="text-balance text-muted-foreground">
              Sign up to get started with ManyShorts
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-[16px] md:text-sm"
              >
                Name
              </Label>
              <Input
                id="name"
                className="h-[50px] text-[16px] md:h-[36px] md:text-sm"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-[16px] md:text-sm"
              >
                Email
              </Label>
              <Input
                id="email"
                className="h-[50px] text-[16px] md:h-[36px] md:text-sm"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-[16px] md:text-sm"
              >
                Password
              </Label>
              <Input
                id="password"
                className="h-[50px] text-[16px] md:h-[36px] md:text-sm"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-[50px] md:h-[36px] text-[16px] md:text-sm"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium underline hover:text-indigo-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block relative">
        <Image
          src="/bg-dark.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
