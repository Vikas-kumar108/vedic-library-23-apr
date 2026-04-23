'use client'

import { useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN' | 'TEACHER'
  stage: 'BRAHMACARYA' | 'GRIHASTHA' | 'VANAPRASTHA' | 'SANNYASA'
}

/**
 * useAuth Hook
 * Responsibility: Manage and expose the current user state.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock: Check local storage for session
    const savedUser = localStorage.getItem('vedic_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isTeacher: user?.role === 'TEACHER'
  }
}
