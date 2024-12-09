// src/components/Notification.jsx

import React, { useEffect } from 'react';
import { useNotifications } from '../../../context/NotificationContext';

const Notification = () => {
  const {
    notifications,
    loading,
    error,
    fetchNotifications,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useNotifications();

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications(currentPage); // Fetch notifications for the current page
  }, [currentPage, fetchNotifications]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page number
  };

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>

      {loading && <p>Loading notifications...</p>}

      {error && <p className="error">{error}</p>}

      {notifications && notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <h3>{notification.title}</h3>
              <p>{notification.description}</p>
              <small>Created by: {notification.generated_by.username}</small>
              <p>{new Date(notification.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications available</p>
      )}

      <div className="pagination">
        {/* Display previous page button */}
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}

        {/* Display next page button */}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>

      <div className="page-info">
        {/* Display total notifications count and current page */}
        <p>
          Page {currentPage} of {totalPages} ({total} notifications)
        </p>
      </div>
    </div>
  );
};

export default Notification;
