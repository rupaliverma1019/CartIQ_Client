import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardStats } from "../services/dashboardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Line,
  Pie,
  Bar,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {

  const { token } = useSelector(
    (state) => state.auth
  );

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data = await getDashboardStats(token);

      setStats(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading)
    return (
      <h2 className="text-center mt-10 text-2xl">
        Loading...
      </h2>
    );

  if (!stats)
    return (
      <h2 className="text-center mt-10">
        No Dashboard Data
      </h2>
    );

  // =============================
  // Monthly Revenue Chart
  // =============================

  const lineData = {

    labels: stats.monthlySales.map(
      item => `Month ${item._id.month}`
    ),

    datasets: [
      {
        label: "Revenue",

        data: stats.monthlySales.map(
          item => item.revenue
        ),

        borderColor: "blue",

        backgroundColor: "rgba(59,130,246,0.3)",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  // =============================
  // Payment Pie Chart
  // =============================

  const paymentData = {

    labels: stats.paymentStats.map(
      item => item._id
    ),

    datasets: [
      {
        data: stats.paymentStats.map(
          item => item.count
        ),
      },
    ],
  };

  // =============================
  // Order Status Chart
  // =============================

  const statusData = {

    labels: stats.orderStatus.map(
      item => item._id
    ),

    datasets: [
      {
        data: stats.orderStatus.map(
          item => item.count
        ),
      },
    ],
  };

  // =============================
  // Top Products Chart
  // =============================

  const topProductsData = {

    labels: stats.topProducts.map(
      item => item._id
    ),

    datasets: [
      {
        label: "Units Sold",

        data: stats.topProducts.map(
          item => item.sold
        ),
      },
    ],
  };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">

        Admin Dashboard

      </h1>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">

          <h2 className="text-xl">

            Products

          </h2>

          <p className="text-4xl font-bold mt-3">

            {stats.totalProducts}

          </p>

        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow">

          <h2 className="text-xl">

            Users

          </h2>

          <p className="text-4xl font-bold mt-3">

            {stats.totalUsers}

          </p>

        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">

          <h2 className="text-xl">

            Orders

          </h2>

          <p className="text-4xl font-bold mt-3">

            {stats.totalOrders}

          </p>

        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow">

          <h2 className="text-xl">

            Revenue

          </h2>

          <p className="text-4xl font-bold mt-3">

            ₹ {stats.totalRevenue}

          </p>

        </div>

      </div>

      {/* Monthly Revenue */}

      <div className="bg-white shadow rounded-xl p-6 mt-10">

        <h2 className="text-2xl font-bold mb-5">

          Monthly Revenue

        </h2>

        <Line data={lineData} />

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5">

            Payment Distribution

          </h2>

          <Pie data={paymentData} />

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5">

            Order Status

          </h2>

          <Pie data={statusData} />

        </div>

      </div>

      {/* Top Products */}

      <div className="bg-white shadow rounded-xl p-6 mt-10">

        <h2 className="text-2xl font-bold mb-5">

          Top Selling Products

        </h2>

        <Bar data={topProductsData} />

      </div>

      {/* Latest Orders */}

      <div className="bg-white shadow rounded-xl p-6 mt-10">

        <h2 className="text-2xl font-bold mb-5">

          Latest Orders

        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-3">

                Order

              </th>

              <th className="border p-3">

                Customer

              </th>

              <th className="border p-3">

                Total

              </th>

            </tr>

          </thead>

          <tbody>

            {stats.latestOrders?.map(order => (

              <tr key={order._id}>

                <td className="border p-3">

                  {order.orderNumber}

                </td>

                <td className="border p-3">

                  {order.user?.name}

                </td>

                <td className="border p-3">

                  ₹ {order.total}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminDashboard;