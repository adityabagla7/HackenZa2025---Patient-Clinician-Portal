import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Dashboard from './pages/Dashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PatientDashboard from './pages/PatientDashboard'
import Register from './pages/Register'

// Components
import Layout from './components/Layout'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      {/* Demo routes without authentication for easier testing */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Redirect from / to the appropriate route */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
      />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App 