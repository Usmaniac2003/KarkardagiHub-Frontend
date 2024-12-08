
import React, { useState, useEffect } from 'react';
import { useTaskContext } from "../../context/TaskContext";

const TaskSubmissionForm = ({ selectedTask }) => {
  const { updateTask } = useTaskContext();
  const [formData, setFormData] = useState({
    task_name: '',
    description: '',
    assigned_to: '',
    due_date: '',
    assigned_date: '',
    priority: '',
    status: '',
    project_id: '',
    points_worth: 0,
    file_name: '',
    file_url: ''
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        ...selectedTask,
        file_name: '',
        file_url: ''
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        file_name: file.name,
        file_url: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(formData);
      // Reset file fields after submission
      setFormData(prevState => ({
        ...prevState,
        file_name: '',
        file_url: ''
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!selectedTask) {
    return <div>Please select a task from the slider above.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Task Submission Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (keep the existing form fields) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task_name" className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <input
              type="text"
              id="task_name"
              name="task_name"
              value={formData.task_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task name"
              readOnly
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Task description"
            rows="3"
            readOnly
          ></textarea>
        </div>
        <div>
            <label htmlFor="points_worth" className="block text-sm font-medium text-gray-700 mb-1">Points Worth</label>
            <input
              type="number"
              id="points_worth"
              name="points_worth"
              value={formData.points_worth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Points worth"
              readOnly
            />
          </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {formData.file_name && (
          <div>
            <p className="text-sm text-gray-600">File: {formData.file_name}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Task Update
        </button>
      </form>
    </div>
  );
};

export default TaskSubmissionForm;


