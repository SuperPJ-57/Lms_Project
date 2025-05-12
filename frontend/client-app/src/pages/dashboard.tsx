import { useLoaderData } from "react-router-dom";
import { FaUsers, FaBook,  FaNetworkWired } from "react-icons/fa";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DashboardData } from "../types/dashboard";

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const dashboardData = useLoaderData() as DashboardData;
  //const username: string | null = sessionStorage.getItem("username");

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <img src="/resources/user.png" alt="User Icon" className="w-6 h-6 mr-2" />
          <span className="font-bold">{dashboardData?.user_name}</span>
          <span className="text-gray-500 ml-2">Admin</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Status Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Book Status</h2>
          <div className="h-72">
            <Pie
              data={{
                labels: ["Total Borrowed Books", "Total Returned Books"],
                datasets: [
                  {
                    data: [dashboardData?.total_borrowed_books, dashboardData?.total_returned_books],
                    backgroundColor: ["#36A2EB", "#255D81"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Total User Base" value={dashboardData?.total_user_base ?? 0} icon={<FaUsers className="text-4xl" />} />
          <StatCard title="Total Book Count" value={dashboardData?.total_books ?? 0} icon={<FaBook className="text-4xl" />} />
          <StatCard title="Branch Count" value={dashboardData?.total_faculty ?? 0} icon={<FaNetworkWired className="text-4xl" />} />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <div className="mb-2">{icon}</div>
    <h2 className="text-xl font-bold">{value}</h2>
    <p className="text-gray-500">{title}</p>
  </div>
);

export default Dashboard;
