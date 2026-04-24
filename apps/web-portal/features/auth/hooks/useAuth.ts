'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface User {
  id: string
  name: string
  email: string
  roles: string[]
  stage?: string
  emailVerified?: Date
}

/**
 * useAuth Hook
 * Responsibility: Manage identity orchestration and session persistence.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const logout = useCallback(() => {
    localStorage.removeItem('vedic_token')
    localStorage.removeItem('vedic_user')
    setUser(null)
    router.push('/auth/login')
    toast.success('Pranams. You have been safely signed out.')
  }, [router])

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('vedic_token')
      const savedUser = localStorage.getItem('vedic_user')
      
      if (token && savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (err) {
      console.error('Session restoration failed', err)
      logout()
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (credentials: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('vedic_token', data.token)
        localStorage.setItem('vedic_user', JSON.stringify(data.user))
        setUser(data.user)
        toast.success(`Welcome back, ${data.user.name}`)
        router.push('/dashboard')
        return true
      } else {
        toast.error(data.error || 'Authentication failed')
        return false
      }
    } catch (err) {
      toast.error('Gateway connection failed')
      return false
    }
  }

  const register = async (details: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      })

      const data = await res.json()
      if (res.ok) {
        toast.success('Registration successful. Please verify your email.')
        router.push('/auth/login')
        return true
      } else {
        toast.error(data.error || 'Registration failed')
        return false
      }
    } catch (err) {
      toast.error('Gateway connection failed')
      return false
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
    logout
  }
}
