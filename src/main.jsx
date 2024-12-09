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
import 'react-toastify/dist/ReactToastify.css';  // Import styles for toastify
import { ActivityLogProvider } from './context/ActivityLogContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import { DashboardProvider } from './context/DashboardContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider>
        <TaskProvider>
          <ChatProvider>
          <UserManagementProvider>
          <ActivityLogProvider>
            <ProjectProvider>
              <DashboardProvider>
              <App />
              {/* Place ToastContainer here so it can be used globally */}
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
              </DashboardProvider>
            </ProjectProvider>
            </ActivityLogProvider>
          </UserManagementProvider>
      </ChatProvider>
      </TaskProvider>
      </AuthProvider>
      </CookiesProvider>
    </Router>
  </StrictMode>
);
