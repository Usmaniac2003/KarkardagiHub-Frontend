import React from 'react';
import Sidebar from '../../../components/Staff/Sidebar';
import TaskSubmissionForm from '../../../components/Staff/TaskSubmissionForm';
import TaskSlider from '../../../components/Staff/TaskSlider';
import NavBar from "../../../components/General/Navbar";
import { useTaskContext } from "../../../context/TaskContext";

const AddTaskSubmission = () => {
  const { selectedTask, setSelectedTask } = useTaskContext();

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Main Content Area - Fills remaining space */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* White Container with Rounded Corners */}
        <div className="bg-white rounded-3xl min-h-full shadow-lg overflow-hidden">
          {/* Header Section - Responsive layout */}
          <div className="p-4 lg:p-6 border-b">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <h1 className="text-xl lg:text-2xl font-semibold w-full">
                Task Dashboard
              </h1>
              
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <div className="flex items-center ml-auto">
                  <span className="text-xs lg:text-sm text-gray-600 mr-2">
                    new notifications
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs lg:text-sm">
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Responsive padding and layout */}
          <div className="p-4 lg:p-6">
            {/* Task Slider Section - Full width, responsive margins */}
            <div className="mb-4 lg:mb-8">
              <TaskSlider onTaskSelect={handleTaskSelect} />
            </div>

            {/* Task Submission Form Section - Centered, max width */}
            <div className="w-full max-w-xl mx-auto px-2">
              <TaskSubmissionForm selectedTask={selectedTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskSubmission;

