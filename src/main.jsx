import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/Auth.jsx';
import { CookiesProvider } from 'react-cookie';
import { UserManagementProvider } from './context/UserManagement.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { ChatProvider } from './context/ChatContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider>
        <TaskProvider>
          <ChatProvider>
        <UserManagementProvider>
      <App />
      </UserManagementProvider>
      </ChatProvider>
      </TaskProvider>
      </AuthProvider>
      </CookiesProvider>
    </Router>
  </StrictMode>
);
