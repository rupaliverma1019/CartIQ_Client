import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getOrderDetails } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(id, token);
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchOrder();
    }
  }, [id, token]);

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-2xl font-semibold">
        Loading...
      </h2>
    );
  }

  if (!order) {
    return (
      <h2 className="text-center mt-20 text-red-500 text-2xl">
        Order not found.
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      {/* Order Info */}
      <div className="border rounded-xl p-6 shadow">
        <p>
          <strong>Order Number :</strong> {order.orderNumber}
        </p>

        <p>
          <strong>Status :</strong> {order.orderStatus}
        </p>

        <p>
          <strong>Payment :</strong> {order.paymentMethod}
        </p>

        <p>
          <strong>Date :</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Shipping Address */}
      <div className="border rounded-xl p-6 shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Shipping Address
        </h2>

        <p>{order.shippingAddress?.fullName}</p>
        <p>{order.shippingAddress?.phone}</p>
        <p>{order.shippingAddress?.addressLine1}</p>
        <p>{order.shippingAddress?.city}</p>
        <p>{order.shippingAddress?.state}</p>
        <p>{order.shippingAddress?.postalCode}</p>
      </div>

      {/* Products */}
      <div className="border rounded-xl p-6 shadow mt-8">
        <h2 className="text-2xl font-bold mb-5">
          Products
        </h2>

        {order.items?.map((item) => (
          <div
            key={item._id || item.product?._id || item.product}
            className="flex justify-between border-b py-4"
          >
            <div>
              <h3 className="font-bold">
                {item.title}
              </h3>

              <p>Qty : {item.quantity}</p>
            </div>

            <div>₹{item.price}</div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded-xl p-6 shadow mt-8">
        <h2 className="text-2xl font-bold">
          Order Summary
        </h2>

        <div className="flex justify-between mt-5">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Shipping</span>
          <span>₹{order.shipping}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Tax</span>
          <span>₹{order.tax}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;