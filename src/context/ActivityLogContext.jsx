"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from '../context/Auth'

const ActivityLogContext = createContext(undefined)

export function ActivityLogProvider({ children }) {
  const [activityLogs, setActivityLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedActivityLog, setSelectedActivityLog] = useState(null)
  
  const { user } = useAuth()

  const fetchActivityLogs = async (userId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("authToken")
      const response = await axios.get("http://localhost:3000/api/activity/activity-logs", {
        headers: {
          "x-auth-token": token
        },
        params: { user_id: userId }
      })
      console.log("API Response:", response.data)

      setActivityLogs(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching activity logs:", err)
      setError("Failed to fetch activity logs")
    } finally {
      setLoading(false)
    }
  }

  const addActivityLog = async (activityLogData) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.post("http://localhost:3000/api/activity/add-activity-log", 
        { ...activityLogData, user_id: user.id },
        {
          headers: {
            "x-auth-token": token
          }
        }
      )
      
      setActivityLogs(prevLogs => [...prevLogs, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding activity log:", err)
      setError("Failed to add activity log")
      throw err
    }
  }

  const updateActivityLog = async (updatedActivityLog) => {
    try {
      if (!updatedActivityLog || !updatedActivityLog._id) {
        throw new Error("Invalid activity log data: Missing _id");
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.put(
        `http://localhost:3000/api/activity/update-activity-log/${updatedActivityLog._id}`,
        updatedActivityLog,
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      
      setActivityLogs(prevLogs => 
        prevLogs.map(log => 
          log._id === updatedActivityLog._id ? response.data : log
        )
      );

      return response.data;
    } catch (err) {
      console.error("Error updating activity log:", err);
      setError(err.message || "Failed to update activity log");
      throw err;
    }
  }

  const deleteActivityLog = async (logId) => {
    try {
      const token = localStorage.getItem("authToken")
      await axios.delete(`http://localhost:3000/api/activity/delete-activity-log/${logId}`, {
        headers: {
          "x-auth-token": token
        }
      })
      
      setActivityLogs(prevLogs => prevLogs.filter(log => log._id !== logId))
    } catch (err) {
      console.error("Error deleting activity log:", err)
      setError("Failed to delete activity log")
      throw err
    }
  }

  useEffect(() => {
    if (user && user.id) {
      fetchActivityLogs(user.id)
    }
  }, [user])

  return (
    <ActivityLogContext.Provider
      value={{
        activityLogs,
        loading,
        error,
        selectedActivityLog,
        setSelectedActivityLog,
        fetchActivityLogs: () => fetchActivityLogs(user.id),
        addActivityLog,
        updateActivityLog,
        deleteActivityLog
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  )
}

export function useActivityLogs() {
  const context = useContext(ActivityLogContext)
  if (context === undefined) {
    throw new Error("useActivityLogs must be used within an ActivityLogProvider")
  }
  return context
}

