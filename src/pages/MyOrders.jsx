import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const { token } = useSelector(
    (state) => state.auth
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await getMyOrders(token);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchOrders();
  }
}, [token]);

 
 
  if (loading)
    return (
      <h2 className="text-center mt-20">
        Loading...
      </h2>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-10">

        My Orders

      </h1>

      {orders.length === 0 ? (

        <div className="text-center">

          No Orders Found

        </div>

      ) : (

       orders.map((order) => (
  <div
    key={order._id}
    className="border rounded-xl p-6 mb-6 shadow"
  >
    <div className="flex justify-between items-center">

      <div>
        <h2 className="text-xl font-bold">
          {order.orderNumber}
        </h2>

        <p>
          Status: {order.orderStatus}
        </p>

        <p>
          Payment: {order.paymentMethod}
        </p>

        <p>
          ₹ {order.total}
        </p>
      </div>

      <Link
        to={`/orders/${order._id}`}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>

    </div>
  </div>
))
      )}

    </div>
  );
};

export default MyOrders;