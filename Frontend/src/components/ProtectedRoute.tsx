import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  
  // If still loading auth state, show nothing or a loader
  if (loading) {
    return <div className="loader">Loading...</div>
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />
  }
  
  // If authenticated, render the nested routes
  return <Outlet />
}

export default ProtectedRoute 