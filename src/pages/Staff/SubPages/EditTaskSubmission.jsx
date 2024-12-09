import React, { useState, useEffect, useCallback } from "react"
import { useTaskContext } from "../../../context/TaskContext"

const EditTaskSubmission = () => {
  const { tasks, fetchTasks, updateTask, loading, error } = useTaskContext()
  const [editTask, setEditTask] = useState(null)
  const [search, setSearch] = useState("")
  const [loadingTasks, setLoadingTasks] = useState(false)

  const fetchData = useCallback(() => {
    setLoadingTasks(true)
    fetchTasks({ search })
      .finally(() => {
        setLoadingTasks(false)
      })
  }, [search, fetchTasks])

  useEffect(() => {
    fetchData()
  }, [])

  const handleEditClick = (task) => {
    setEditTask({ ...task })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!editTask) return

    try {
      await updateTask(editTask)
      setEditTask(null)
      fetchData()
    } catch (err) {
      console.error("Error saving task:", err)
    }
  }

  if (loadingTasks || loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Task Submission</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{task.task_name}</td>
                  <td className="px-6 py-4">
                    {editTask && editTask._id === task._id ? (
                      <textarea
                        value={editTask.description}
                        name="description"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="3"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editTask && editTask._id === task._id ? (
                      <select
                        value={editTask.status}
                        name="status"
                        onChange={handleChange}
                        className="px-3 py-2 border rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      task.status
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editTask && editTask._id === task._id ? (
                      <select
                        value={editTask.priority}
                        name="priority"
                        onChange={handleChange}
                        className="px-3 py-2 border rounded-md"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : (
                      task.priority
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editTask && editTask._id === task._id ? (
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(task)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EditTaskSubmission

