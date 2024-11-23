import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/App.css"
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/Auth.jsx'
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from "@chakra-ui/react";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider>
      <App />
      </AuthProvider>
      </CookiesProvider>
      
    </Router>
  </StrictMode>,
)
