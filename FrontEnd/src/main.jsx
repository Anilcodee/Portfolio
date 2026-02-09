import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GoogleOAuthProvider} from "@react-oauth/google"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CommentAuthContext from './context/CommentAuthContext.jsx'
import ThemeContext from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <ThemeContext>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <CommentAuthContext>
            <App/>
          </CommentAuthContext>
        </GoogleOAuthProvider>
      </ThemeContext>
    </UserContext>
  </BrowserRouter>
)
