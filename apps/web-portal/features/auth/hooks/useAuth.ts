'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User } from '@dharma/contracts'
import { trpc } from '@/lib/trpc'

// Institutional User Identity

/**
 * useAuth Hook
 * Responsibility: Manage identity orchestration and session persistence.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      setUser(null)
      router.push('/auth/login')
      toast.success('Pranams. You have been safely signed out.')
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Session restoration failed', err)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const loginMutation = trpc.auth.login.useMutation();

  const login = async (credentials: any) => {
    try {
      const data = await loginMutation.mutateAsync(credentials);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name}`);
      router.push('/dashboard');
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
      return false;
    }
  }

  const registerMutation = trpc.auth.register.useMutation();

  const register = async (details: any) => {
    try {
      await registerMutation.mutateAsync(details);
      toast.success('Registration successful. Please verify your email.');
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
      return false;
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.roles?.includes('admin'),
    isTeacher: user?.roles?.includes('teacher'),
    login,
    register,
    logout,
    checkAuth
  }
}
