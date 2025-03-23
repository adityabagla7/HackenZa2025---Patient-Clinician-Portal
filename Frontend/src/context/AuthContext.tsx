import axios from 'axios'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'clinician' | 'patient'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: 'doctor' | 'patient') => void
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
  
  // Generate a unique session ID for this tab
  useEffect(() => {
    if (!sessionStorage.getItem('tabId')) {
      sessionStorage.setItem('tabId', Math.random().toString(36).substring(2, 15));
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      // Use sessionStorage instead of localStorage to make each tab independent
      const token = sessionStorage.getItem('token')
      
      if (token) {
        try {
          // In a real app, we would verify the token
          // For the demo, just check if a token exists
          if (token === 'mock-jwt-token') {
            // Create a user based on stored data or a default mock user
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser) as User);
            } else {
              // Default mock user
              const defaultUser: User = {
                id: '123456',
                name: 'Demo User',
                email: 'user@example.com',
                role: 'patient'
              };
              setUser(defaultUser);
            }
          } else {
            // Invalid token
            sessionStorage.removeItem('token');
            setUser(null);
          }
        } catch (err) {
          sessionStorage.removeItem('token');
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
      // Validate clinician credentials
      if (email.toLowerCase() === 'doctor@pharmacy.in') {
        if (password === '1234COCU') {
          // Valid clinician login
          const mockUser: User = {
            id: 'doc123',
            name: 'Doctor',
            email: email,
            role: 'clinician'
          };
          
          // Store user info
          const mockToken = 'mock-jwt-token';
          sessionStorage.setItem('token', mockToken);
          sessionStorage.setItem('user', JSON.stringify(mockUser));
          setUser(mockUser);
          return Promise.resolve();
        } else {
          // Invalid password for clinician
          setError('Invalid password for clinician');
          return Promise.reject(new Error('Invalid password'));
        }
      }
      
      // Validate patient credentials
      const validPatientCredentials = [
        { email: 'patient1@gmail.com', password: 'patient1' },
        { email: 'patient2@gmail.com', password: 'patient2' },
        { email: 'patient3@gmail.com', password: 'patient3' },
        { email: 'patient4@gmail.com', password: 'patient4' }
      ];
      
      const matchedPatient = validPatientCredentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (matchedPatient) {
        // Valid patient login
        const mockUser: User = {
          id: `pat_${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          role: 'patient'
        };
        
        // Store user info
        const mockToken = 'mock-jwt-token';
        sessionStorage.setItem('token', mockToken);
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return Promise.resolve();
      }
      
      // If we get here, credentials were invalid
      setError('Invalid email or password');
      return Promise.reject(new Error('Invalid credentials'));
    } catch (err: any) {
      setError('An error occurred during login');
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }
  
  // Add a function to switch between doctor and patient roles for testing
  const switchRole = (role: 'doctor' | 'patient') => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      role: role
    };
    
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    switchRole
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 