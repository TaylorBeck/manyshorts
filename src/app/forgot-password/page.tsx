'use client';

import { useState } from 'react';
import { forgotPassword } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    await forgotPassword('forgotPassword', {
      redirect: false,
      email
    });

    setLoading(false);

    toast({
      title: 'Email Sent',
      description: `If an account exists for ${email}, check your email for password reset instructions.`
    });

    setLoading(false);
  };

  return (
    <div className="w-full md:grid md:grid-cols-2 h-screen overflow-hidden">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="mx-8 md:mx-auto grid w-full md:w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to receive a password reset email.
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-[16px] md:text-sm"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-[50px] text-[16px] md:h-[36px] md:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-[50px] md:h-[36px] text-[16px] md:text-sm"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link
              href="/sign-in"
              className="font-medium underline hover:text-indigo-500"
            >
              Back to Sign In
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
