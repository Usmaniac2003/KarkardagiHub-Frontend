import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StaffDashboardContext = createContext();

export const StaffDashboardProvider = ({ children }) => {
  const [totalTasksAssigned, setTotalTasksAssigned] = useState(0);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [productivityTrend, setProductivityTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStaffDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch tasks (no auth required)
      const tasksResponse = await axios.get("http://localhost:3000/tasks");
      const tasks = Array.isArray(tasksResponse.data) ? tasksResponse.data : [];

      // Calculate task statistics
      const assigned = tasks.length;
      const completed = tasks.filter(task => task.status === "Completed").length;
      const completionRate = assigned > 0 ? (completed / assigned) * 100 : 0;
      const upcoming = tasks.filter(task => {
        const dueDate = new Date(task.due_date);
        return dueDate > new Date() && task.status !== "Completed";
      }).length;

      setTotalTasksAssigned(assigned);
      setTotalTasksCompleted(completed);
      setTaskCompletionRate(completionRate);
      setUpcomingDeadlines(upcoming);

      // Try to fetch user data with auth token
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userResponse = await axios.get("http://localhost:3000/api/users/current", {
            headers: {
              "x-auth-token": token
            }
          });
          const achievements = userResponse.data?.badges || [];
          setRecentAchievements(achievements);
        } catch (userError) {
          console.log("Could not fetch user achievements:", userError.message);
          setRecentAchievements([]);
        }
      }

      // Calculate productivity trend
      const last5Days = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
      }).reverse();

      const productivityData = last5Days.map(date => {
        const dayStart = new Date(date.setHours(0, 0, 0, 0));
        const dayEnd = new Date(date.setHours(23, 59, 59, 999));
        
        const completedTasks = tasks.filter(task => {
          const taskDate = new Date(task.completed_at);
          return taskDate >= dayStart && taskDate <= dayEnd && task.status === "Completed";
        }).length;

        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          productivity: completedTasks
        };
      });

      setProductivityTrend(productivityData);

    } catch (err) {
      console.error("Error fetching staff dashboard data:", err);
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffDashboardData();
  }, []);

  return (
    <StaffDashboardContext.Provider
      value={{
        totalTasksAssigned,
        totalTasksCompleted,
        taskCompletionRate,
        upcomingDeadlines,
        recentAchievements,
        productivityTrend,
        loading,
        error,
        fetchStaffDashboardData,
      }}
    >
      {children}
    </StaffDashboardContext.Provider>
  );
};

export const useStaffDashboard = () => {
  const context = useContext(StaffDashboardContext);
  if (context === undefined) {
    throw new Error("useStaffDashboard must be used within a StaffDashboardProvider");
  }
  return context;
};

