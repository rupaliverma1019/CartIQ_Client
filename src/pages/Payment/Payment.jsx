import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../../services/orderService";
import { clearCart } from "../../redux/slices/cartSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Redux Data
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.shipping);
  const { token } = useSelector((state) => state.auth);
console.log("Redux Token:", token);
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Calculate Prices
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharge = subtotal > 1000 ? 0 : 99;

  const totalPrice = subtotal + shippingCharge;

  // Place Order
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
  items: cartItems.map((item) => ({
    product: item._id,
    title: item.title,
    image: item.images?.[0]?.url || "",
    price: item.price,
    quantity: item.quantity,
  })),

  shippingAddress,

  paymentMethod,

  subtotal,

  shipping: shippingCharge,

  tax: 0,

  total: totalPrice,
};
      const data = await createOrder(orderData, token);

      console.log(data);

      alert("Order Placed Successfully");

      dispatch(clearCart());

      navigate("/order-success");
    } catch (error) {
  console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Response Data:", error.response?.data);

  alert(
    error.response?.data?.message || "Failed to place order."
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Payment
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Side */}

        <div className="lg:col-span-2">

          {/* Shipping Address */}

          <div className="border rounded-xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-5">
              Shipping Address
            </h2>

            <p>
              <strong>Name :</strong>{" "}
              {shippingAddress.fullName}
            </p>

            <p>
              <strong>Phone :</strong>{" "}
              {shippingAddress.phone}
            </p>

            <p>
              <strong>Address :</strong>{" "}
              {shippingAddress.address}
            </p>

            <p>
              <strong>City :</strong>{" "}
              {shippingAddress.city}
            </p>

            <p>
              <strong>State :</strong>{" "}
              {shippingAddress.state}
            </p>

            <p>
              <strong>Pincode :</strong>{" "}
              {shippingAddress.pincode}
            </p>

          </div>

          {/* Payment Method */}

          <div className="border rounded-xl p-6 shadow mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Payment Method
            </h2>

            <label className="flex items-center gap-3 mb-4">

              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />

              Cash On Delivery

            </label>

            <label className="flex items-center gap-3">

              <input
                type="radio"
                checked={paymentMethod === "RAZORPAY"}
                onChange={() =>
                  setPaymentMethod("RAZORPAY")
                }
              />

              Razorpay

            </label>

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div className="border rounded-xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">

              <span>Subtotal</span>

              <span>₹ {subtotal}</span>

            </div>

            <div className="flex justify-between mb-3">

              <span>Shipping</span>

              <span>₹ {shippingCharge}</span>

            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>₹ {totalPrice}</span>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Payment;