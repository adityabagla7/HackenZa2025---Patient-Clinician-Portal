import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'patient'
  picture?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  googleLogin: (response: any, userType: 'patient' | 'clinician') => Promise<void>
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
          // For the demo, just retrieve the user from localStorage
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
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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

  const googleLogin = async (response: any, userType: 'patient' | 'clinician') => {
    setLoading(true);
    setError(null);
    
    try {
      // MOCK GOOGLE LOGIN - No backend API call for the demo
      // In a real app, you would verify the Google token with your backend

      // Extract credential info from response
      let payload;
      try {
        // If the response has credential, it's the JWT token from Google
        if (response.credential) {
          payload = jwtDecode(response.credential);
        } else {
          // If not, use what we have
          payload = response;
        }
      } catch (e) {
        // If decoding fails, use the response as is
        payload = response;
      }
      
      // Extract data from Google response
      const mockUser = {
        id: payload.sub || 'google-user-123',
        name: payload.name || 'Google User',
        email: payload.email || 'google-user@example.com',
        role: userType === 'clinician' ? 'doctor' : 'patient', // Set role based on login form
        picture: payload.picture
      };
      
      // Create a mock token that contains the user info
      const mockToken = 'google-mock-jwt-token';
      
      // Store mock token and user
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Set user
      setUser(mockUser);
      
      return Promise.resolve();
    } catch (err: any) {
      console.error('Google login error:', err);
      setError('An error occurred during Google login');
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
    googleLogin,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 