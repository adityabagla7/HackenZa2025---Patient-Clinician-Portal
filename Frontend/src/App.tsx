import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Appointments from './pages/Appointments'
import Billing from './pages/Billing'
import Dashboard from './pages/Dashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MedicalRecords from './pages/MedicalRecords'
import NotFound from './pages/NotFound'
import PatientDashboard from './pages/PatientDashboard'
import Patients from './pages/Patients'
import Prescriptions from './pages/Prescriptions'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user } = useAuth()

  // Helper function to redirect based on user role
  const getRedirectPath = () => {
    if (!user) return "/login"
    
    switch (user.role) {
      case 'doctor':
      case 'clinician':
        return "/doctor-dashboard"
      case 'patient':
        return "/patient-dashboard"
      default:
        return "/dashboard"
    }
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={getRedirectPath()} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={getRedirectPath()} />} />
      
      {/* Protected routes with authentication */}
      <Route element={<Layout />}>
        {/* Admin and general routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Patient-only routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Route>
        
        {/* Doctor-only routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor', 'clinician']} />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Route>

        {/* Common routes for both patients and doctors */}
        <Route element={<ProtectedRoute allowedRoles={['patient', 'doctor', 'clinician']} />}>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Patient-specific routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/billing" element={<Billing />} />
        </Route>
        
        {/* Doctor-specific routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor', 'clinician']} />}>
          <Route path="/patients" element={<Patients />} />
        </Route>
      </Route>

      {/* Redirect from / to the appropriate route */}
      <Route 
        path="/" 
        element={<Navigate to={getRedirectPath()} />} 
      />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App 