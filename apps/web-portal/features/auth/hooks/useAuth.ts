'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  roles: string[]
  emailVerified?: Date
  spiritual_profile?: {
    life_stage: string
    inner_state: string
    eligibility_level: number
    current_focus: string
    current_primary_node_id: string
    last_guided_at: string
  }
  statistics?: {
    nodes_read_count: number
    courses_completed: number
  }
}

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

  const login = async (credentials: any) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await res.json()
      if (res.ok) {
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      })

      const data = await res.json()
      if (res.ok) {
        toast.success('Registration successful. Please verify your email.')
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
    logout,
    checkAuth
  }
}
