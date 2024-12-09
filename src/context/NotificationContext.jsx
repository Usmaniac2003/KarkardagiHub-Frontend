// src/context/NotificationsContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const NotificationsContext = createContext();

// Provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]); // Store notification data
  const [total, setTotal] = useState(0); // Store total notifications count
  const [totalPages, setTotalPages] = useState(0); // Store total pages for pagination
  const [currentPage, setCurrentPage] = useState(1); // Store current page number
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch notifications
  const fetchNotifications = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/admin/getAllNotifications', {
        params: { page, limit },
      });
      console.log("My",response);
      
      
      // Assuming the response follows this structure: { success, data, total, totalPages, currentPage }
      const { data, total, totalPages, currentPage } = response.data;

      setNotifications(data); // Set notifications data
      setTotal(total); // Set total number of notifications
      setTotalPages(totalPages); // Set total number of pages
      setCurrentPage(currentPage); // Set current page number
    } catch (err) {
      setError('Error fetching notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications on initial load
  useEffect(() => {
    fetchNotifications(currentPage); // Fetch notifications when the component mounts
  }, [currentPage]); // Trigger when currentPage changes

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        error,
        fetchNotifications,
        total,
        totalPages,
        currentPage,
        setCurrentPage, // Expose setCurrentPage for pagination
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  // Ensure that the context is being used within the provider
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
};
