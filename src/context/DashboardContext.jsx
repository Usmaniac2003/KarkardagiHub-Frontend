// DashboardContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/apiservice"; // Your API service

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // States for each metric
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalActiveProjects, setTotalActiveProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [usersWithBadges, setUsersWithBadges] = useState(0);

  // States for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all dashboard metrics
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make a single API call to fetch all data
      const response = await api.get("/admin/dashboard");
      const data = response;

      // Set state with the fetched data
      setTotalManagers(data.totalManagers || 0);
      setTotalStaff(data.totalStaff || 0);
      setTotalActiveUsers(data.totalActiveUsers || 0);
      setTotalProjects(data.totalProjects || 0);
      setTotalActiveProjects(data.totalActiveProjects || 0);
      setTotalTasks(data.totalTasks || 0);
      setTotalCompletedTasks(data.totalCompletedTasks || 0);
      setPendingReviews(data.pendingReviews || 0);
      setUsersWithBadges(data.usersWithBadges || 0);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.message);
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Call to fetch data when the component mounts
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        totalManagers,
        totalStaff,
        totalActiveUsers,
        totalProjects,
        totalActiveProjects,
        totalTasks,
        totalCompletedTasks,
        pendingReviews,
        usersWithBadges,
        loading,
        error,
        fetchDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the Dashboard Context
export const useDashboard = () => {
  return useContext(DashboardContext);
};
