import React, { useEffect } from "react";
import { useStaffDashboard } from "../../../context/StaffDashboardContext";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const Home = () => {
  const {
    totalTasksAssigned,
    totalTasksCompleted,
    taskCompletionRate,
    upcomingDeadlines,
    recentAchievements,
    productivityTrend,
    loading,
    error,
    fetchStaffDashboardData,
  } = useStaffDashboard();

  useEffect(() => {
    fetchStaffDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  // Bar Chart Data
  const taskData = [
    { name: "Assigned Tasks", value: totalTasksAssigned },
    { name: "Completed Tasks", value: totalTasksCompleted },
  ];

  // Pie Chart Data
  const completionRateData = [
    { name: "Completed", value: taskCompletionRate, color: "#4BC0C0" },
    { name: "Remaining", value: 100 - taskCompletionRate, color: "#FF6384" },
  ];

  return (
    <div className="container mx-auto mt-5 p-6">
      <h1 className="text-center mb-4 text-2xl font-bold">Staff Dashboard</h1>

      <div className="flex flex-wrap justify-between mb-6 gap-6">
        {/* Bar Chart */}
        <div className="flex-1 min-w-[48%] mb-6 md:mb-0 rounded-md">
          <div className="bg-[#DBEBFF] shadow-lg p-4 h-full">
            <h3 className="text-center font-semibold">Task Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex-1 min-w-[48%] rounded-md">
          <div className="bg-[#DBEBFF] shadow-lg p-4 h-full">
            <h3 className="text-center font-semibold">Task Completion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionRateData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {completionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Productivity Trend */}
      <div className="mb-6">
        <div className="bg-[#DBEBFF] shadow-lg p-4 rounded-md">
          <h3 className="text-center font-semibold mb-4">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="productivity" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid container for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5 className="font-semibold">Total Tasks Assigned</h5>
          <h4 className="text-2xl font-bold">{totalTasksAssigned}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5 className="font-semibold">Total Tasks Completed</h5>
          <h4 className="text-2xl font-bold">{totalTasksCompleted}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5 className="font-semibold">Task Completion Rate</h5>
          <h4 className="text-2xl font-bold">{taskCompletionRate.toFixed(2)}%</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5 className="font-semibold">Upcoming Deadlines</h5>
          <h4 className="text-2xl font-bold">{upcomingDeadlines}</h4>
        </div>
      </div>

    </div>
  );
};

export default Home;

