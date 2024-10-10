'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const currentUser = {
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || ''
      };
      setUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      setUser(null);
      localStorage.removeItem('currentUser');
    }
  }, [session]);

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    localStorage.removeItem('currentUser');
    router.push('/sign-in');
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
