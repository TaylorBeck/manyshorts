'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

type UserSettings = {
  name: string;
  email: string;
  youtubeConnected: boolean;
  tiktokConnected: boolean;
  instagramConnected: boolean;
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<UserSettings>();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch user data and set form values
    const fetchUserData = async () => {
      const response = await fetch('/api/user');
      if (response.ok) {
        const userData = await response.json();
        setValue('name', userData.name);
        setValue('email', userData.email);
        setValue('youtubeConnected', userData.youtubeConnected || false);
        setValue('tiktokConnected', userData.tiktokConnected || false);
        setValue('instagramConnected', userData.instagramConnected || false);
      }
    };
    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data: UserSettings) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast({ title: 'Settings updated successfully' });
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and connected platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
            />
          </div>
          <div className="space-y-4">
            <Label>Connected Accounts</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="youtube">YouTube</Label>
              <Switch
                id="youtube"
                {...register('youtubeConnected')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="tiktok">TikTok</Label>
              <Switch
                id="tiktok"
                {...register('tiktokConnected')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="instagram">Instagram</Label>
              <Switch
                id="instagram"
                {...register('instagramConnected')}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
