'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  name: string;
  email: string;
  role: 'student' | 'senior' | 'officer';
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData) as AuthUser);
    } catch {
      router.push('/login');
    }
  }, [router]);

  return user;
}

/** Returns true if the role can post/create content */
export function canPost(role: string) {
  return role === 'senior' || role === 'officer';
}

/** Returns true if the role can add/manage companies */
export function canManageCompanies(role: string) {
  return role === 'officer';
}
