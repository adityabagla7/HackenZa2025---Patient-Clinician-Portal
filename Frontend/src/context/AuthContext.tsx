import axios from 'axios'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'patient'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          // In a real app, we would verify the token
          // For the demo, just check if a token exists
          if (token === 'mock-jwt-token') {
            // Create a user based on stored data or a default mock user
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              // Default mock user
              setUser({
                id: '123456',
                name: 'Demo User',
                email: 'user@example.com',
                role: 'patient'
              });
            }
          } else {
            // Invalid token
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // MOCK LOGIN - No backend API call for the demo
      // Create a mock token and user based on email
      const mockUser = {
        id: '123456',
        name: email.split('@')[0],
        email: email,
        role: email.toLowerCase().includes('doctor') ? 'doctor' : 'patient' // Set role based on email
      };
      
      // Create a mock token that contains the user info
      const mockToken = 'mock-jwt-token';
      
      // Store mock token and user
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Set user
      setUser(mockUser);
      
      return Promise.resolve();
    } catch (err: any) {
      setError('An error occurred during login');
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 