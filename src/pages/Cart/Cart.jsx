import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;

  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-4">

Looks like you haven't added anything yet.

</p>

<Link
to="/"
className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
>

Continue Shopping

</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Products */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 border rounded-xl p-4 mb-5"
            >
              <img
                src={
                  item.images?.length
                    ? item.images[0].url
                    : "https://via.placeholder.com/150"
                }
                alt={item.title}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  ₹ {item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item._id))
                    }
                    className="bg-gray-200 w-8 h-8 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item._id))
                    }
                    className="bg-gray-200 w-8 h-8 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item._id))
                    }
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="border rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹ {shipping}</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;