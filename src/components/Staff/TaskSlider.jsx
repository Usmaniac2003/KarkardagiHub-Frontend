import React from 'react';
import { useTaskContext } from "../../context/TaskContext";

// TaskCard Component
const TaskCard = ({ task, onSelect }) => {
  if (!task) {
    return null;
  }

  const statusColors = {
    'Pending': 'bg-yellow-200 text-yellow-800',
    'In Progress': 'bg-blue-200 text-blue-800',
    'Completed': 'bg-green-200 text-green-800'
  };

  const priorityColors = {
    'Low': 'bg-gray-200 text-gray-800',
    'Medium': 'bg-orange-200 text-orange-800',
    'High': 'bg-red-200 text-red-800'
  };

  return (
    <div className="min-w-[300px] max-w-[300px] bg-white p-4 rounded-lg mr-4 shadow-md">
      <h3 className="text-lg font-medium text-gray-900">{task.task_name}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Assigned to: {task.assigned_to?.name || 'Unassigned'}
      </p>
      <p className="text-sm text-gray-600">
        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}
      </p>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status] || 'bg-gray-200 text-gray-800'}`}>
          {task.status}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority] || 'bg-gray-200 text-gray-800'}`}>
          {task.priority}
        </span>
      </div>
      <button 
        className="mt-3 w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={() => onSelect(task)}
      >
        View Details
      </button>
    </div>
  );
};

const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1 rounded-full text-sm mr-2
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
        transition-colors
      `}
    >
      {label}
    </button>
  );
};

const TaskSlider = ({ onTaskSelect }) => {
  const { tasks, loading, error, filterStatus, setFilterStatus, sortBy, setSortBy } = useTaskContext();

  console.log("Tasks in TaskSlider:", tasks); // Debug log

  const getFilteredTasks = () => {
    if (!Array.isArray(tasks)) {
      console.error('Tasks is not an array:', tasks);
      return [];
    }

    let filtered = [...tasks].filter(task => task !== null && task !== undefined);
    
    // Apply status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    
    // Apply sorting
    if (sortBy === 'Due Date') {
      filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (sortBy === 'Priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    
    return filtered;
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!tasks || tasks.length === 0) return <div className="p-4">No tasks available.</div>;

  const filteredTasks = getFilteredTasks();

  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task Dashboard</h2>
      
      {/* Filter Section */}
      <div className="mb-6 flex items-center flex-wrap">
        <span className="text-sm text-gray-600 mr-3">Filters:</span>
        <FilterButton
          label="All"
          active={filterStatus === 'All'}
          onClick={() => setFilterStatus('All')}
        />
        <FilterButton
          label="Pending"
          active={filterStatus === 'Pending'}
          onClick={() => setFilterStatus('Pending')}
        />
        <FilterButton
          label="In Progress"
          active={filterStatus === 'In Progress'}
          onClick={() => setFilterStatus('In Progress')}
        />
        <FilterButton
          label="Completed"
          active={filterStatus === 'Completed'}
          onClick={() => setFilterStatus('Completed')}
        />
      </div>

      {/* Sort Section */}
      <div className="mb-6 flex items-center">
        <span className="text-sm text-gray-600 mr-3">Sort by:</span>
        <FilterButton
          label="Due Date"
          active={sortBy === 'Due Date'}
          onClick={() => setSortBy('Due Date')}
        />
        <FilterButton
          label="Priority"
          active={sortBy === 'Priority'}
          onClick={() => setSortBy('Priority')}
        />
      </div>

      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto">
        <div className="flex pb-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onSelect={onTaskSelect}
              />
            ))
          ) : (
            <div className="w-full text-center text-gray-500">
              No tasks match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSlider;

