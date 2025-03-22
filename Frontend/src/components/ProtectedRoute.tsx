import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'doctor' | 'patient')[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  
  // Show loading state if authentication is still in progress
  if (loading) {
    return <div>Loading...</div>
  }
  
  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // If roles are specified and user's role is not allowed, redirect to appropriate dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on user's role
    switch (user.role) {
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />
      case 'patient':
        return <Navigate to="/patient-dashboard" replace />
      default:
        return <Navigate to="/dashboard" replace />
    }
  }
  
  // If user is allowed, render the child routes
  return <Outlet />
}

export default ProtectedRoute 