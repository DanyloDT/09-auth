'use client';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (!isAuthenticated) {
          clearAuth();
          return;
        }

        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error('Failed to restore session', error);
        clearAuth();
      }
    };
    fetchUser();
  }, [setUser, clearAuth]);

  return children;
};

export default AuthProvider;
