import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );
  const { cartItems } = useSelector(
(state) => state.cart
);
const cartCount = cartItems.reduce(
(acc, item) => acc + item.quantity,
0
);
const handleLogout = () => {
  dispatch(logout());

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          MERN Store
        </h1>

        <div className="space-x-5">
          <Link to="/">Home</Link>
          
          {user ? (
            <>
      <Link to="/cart">
        Cart
        <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-xs">
          {cartCount}
        </span>
      </Link>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
             
 </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;