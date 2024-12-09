import { useDashboard } from "../../../context/DashboardContext";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Home = () => {
  const {
    totalManagers,
    totalStaff,
    totalActiveUsers,
    totalProjects,
    totalActiveProjects,
    totalTasks,
    totalCompletedTasks,
    pendingReviews,
    usersWithBadges,
    loading,
    error,
  } = useDashboard();

  // Check if the data is still loading
  if (loading) {
    return <div className="text-center">Loading dashboard data...</div>;
  }

  // Check if there is an error
  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  // Bar Chart Data
  const barChartData = [
    { name: "Managers", value: totalManagers },
    { name: "Active Users", value: totalActiveUsers },
    { name: "Projects", value: totalProjects },
    { name: "Tasks", value: totalTasks },
  ];

  // Pie Chart Data
  const pieChartData = [
    { name: "Active Projects", value: totalActiveProjects, color: "#FF6347" },
    { name: "Completed Tasks", value: totalCompletedTasks, color: "#36A2EB" },
    { name: "Pending Reviews", value: pendingReviews, color: "#FFCD56" },
    { name: "Users with Badges", value: usersWithBadges, color: "#4BC0C0" },
  ];

  return (
    <div className="container mx-auto mt-5 p-6">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Flex container for Bar and Pie Charts */}
      <div className="flex flex-wrap justify-between mb-6 gap-6" style={{ height: "60vh" }}>
        {/* Bar Chart */}
        <div className="flex-1 min-w-[48%] mb-6 md:mb-0 rounded-md">
          <div className="bg-[#DBEBFF] shadow-lg p-4 h-full">
            <h3 className="text-center">Total Counts</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barChartData}>
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
        <div className="flex-1 min-w-[48%] rounded-md" >
          <div className="bg-[#DBEBFF] shadow-lg p-4 h-full">
            <h3 className="text-center ">Metrics Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie data={pieChartData} dataKey="value" outerRadius={120} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid container for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Managers</h5>
          <h4>{totalManagers}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Staff</h5>
          <h4>{totalStaff}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Active Users</h5>
          <h4>{totalActiveUsers}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Projects</h5>
          <h4>{totalProjects}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Active Projects</h5>
          <h4>{totalActiveProjects}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Tasks</h5>
          <h4>{totalTasks}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Completed Tasks</h5>
          <h4>{totalCompletedTasks}</h4>
        </div>
        <div className="bg-[#DBEBFF] shadow-lg p-4 text-center rounded-md">
          <h5>Total Pending Reviews</h5>
          <h4>{pendingReviews}</h4>
        </div>
        </div>
    </div>
  );
};

export default Home;
