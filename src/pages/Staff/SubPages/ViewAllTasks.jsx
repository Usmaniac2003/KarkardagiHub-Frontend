import React, { useState, useEffect } from "react"
import { useTaskContext } from "../../../context/TaskContext"

const ViewTasks = () => {
  const { tasks, loading, error, fetchTasks, filterStatus, setFilterStatus, sortBy, setSortBy } = useTaskContext()
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredTasks = tasks
    .filter((task) =>
      task.task_name.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => filterStatus === "All" || task.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "Due Date") {
        return new Date(a.due_date) - new Date(b.due_date)
      } else if (sortBy === "Priority") {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">View Tasks</h2>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearch}
            className="w-1/3 px-3 py-2 border rounded-md"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="Due Date">Sort by Due Date</option>
            <option value="Priority">Sort by Priority</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{task.task_name}</td>
                  <td className="px-6 py-4">{task.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(task.due_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewTasks

