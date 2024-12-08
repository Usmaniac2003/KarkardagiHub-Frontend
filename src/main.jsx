import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/Auth.jsx';
import { CookiesProvider } from 'react-cookie';
import { UserManagementProvider } from './context/UserManagement.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import { ChatProvider } from './context/ChatContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider>
        <TaskProvider>
          <ChatProvider>
          <UserManagementProvider>
          <ProjectProvider>
      <App />
      <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </ProjectProvider>
          </UserManagementProvider>
      </ChatProvider>
      </TaskProvider>
      </AuthProvider>
      </CookiesProvider>
    </Router>
  </StrictMode>
);
