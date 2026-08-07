import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-800";

    case "Processing":
      return "bg-blue-200 text-blue-800";

    case "Shipped":
      return "bg-purple-200 text-purple-800";

    case "Delivered":
      return "bg-green-200 text-green-800";

    case "Cancelled":
      return "bg-red-200 text-red-800";

    default:
      return "bg-gray-200 text-gray-800";
  }
};

const AdminOrders = () => {
  const { token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move fetchOrders outside useEffect
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(token);
      console.log("Orders:", data);

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-20">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Admin Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Order</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border p-3">
                  {order.orderNumber}
                </td>

                <td className="border p-3">
                  <div>
                    <p>{order.user?.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500">
                      {order.user?.email || "-"}
                    </p>
                  </div>
                </td>

                <td className="border p-3">
                  ₹ {(order.total ?? order.subtotal ?? 0).toFixed(2)}
                </td>

                <td className="border p-3">
                  {order.paymentMethod}
                </td>

                <td className="border p-3">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className={`border rounded p-2 ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="border p-3">
                  <Link
                    to={`/orders/${order._id}`}
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;