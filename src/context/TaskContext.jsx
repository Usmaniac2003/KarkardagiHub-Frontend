"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from '../context/Auth'

const TaskContext = createContext(undefined)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("Due Date")
  const [selectedTask, setSelectedTask] = useState(null)
  
  const { user } = useAuth()

  const fetchTasks = async (userId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("authToken")
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          "x-auth-token": token
        }
      })
      console.log("API Response:", response.data)

      // Filter tasks where the user's ID matches the assigned_to._id
      const filteredTasks = response.data.filter(task => 
        task.assigned_to && task.assigned_to._id === userId
      )
      
      setTasks(filteredTasks)
      setError(null)
    } catch (err) {
      console.error("Error fetching tasks:", err)
      setError("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.put(`http://localhost:3000/tasks/${updatedTask._id}`, updatedTask, {
        headers: {
          "x-auth-token": token
        }
      })
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === updatedTask._id ? response.data : task
        )
      )

      if (updatedTask.status === 'Completed') {
        setSelectedTask(null)
      }
    } catch (err) {
      console.error("Error updating task:", err)
      throw err
    }
  }

  useEffect(() => {
    if (user && user.id) {
      fetchTasks(user.id)
    }
  }, [user])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filterStatus,
        sortBy,
        selectedTask,
        setFilterStatus,
        setSortBy,
        setSelectedTask,
        fetchTasks: () => fetchTasks(user.id),
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

