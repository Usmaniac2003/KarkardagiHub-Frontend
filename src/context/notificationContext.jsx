"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const NotificationContext = createContext(undefined)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:3000/api/notifications")
      setNotifications(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching notifications:", err)
      setError("Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        error,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
    return context
}
