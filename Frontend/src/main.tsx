import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

// Get Google Client ID from environment variables
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Check if client ID is available
if (!googleClientId) {
  console.error('Google Client ID is not set in environment variables. OAuth login will not work.');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={googleClientId}
      onScriptLoadError={() => console.error('Google OAuth script failed to load')}
    >
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
) 