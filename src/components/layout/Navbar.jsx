import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()

  
const cartCount = cartItems.reduce((acc, item) => acc + item.quantity,0);

const handleLogout = () => {
    dispatch(logout());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
const handleSearch = (e) => { 
  e.preventDefault(); 
  if (!search.trim())
     return; 
  navigate(`/ai-search?prompt=${encodeURIComponent(search.trim())}`);
   setSearch("");
   };

  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
         CartIQ
        </h1>
{/* AI Search Bar */} 
<form onSubmit={handleSearch} className="flex flex-1 max-w-2xl" >
   <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products with AI..." className="flex-1 border border-gray-300 px-4 py-2 rounded-l-lg outline-none focus:border-blue-500" />
    <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700" aria-label="Search" > 🔍 </button>
 </form>


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
 <Link to="/wishlist">❤️ Wishlist</Link>
  <Link to="/my-orders">
    My Orders
  </Link>

  {/* Show only for Admin */}
  {user?.role === "admin" && (
  <>
    <Link to="/admin/dashboard">
      Dashboard
    </Link>

    <Link to="/admin/products">
      Products
    </Link>

    <Link to="/admin/products/add">
      Add Product
    </Link>

    <Link to="/admin/orders">
      Orders
    </Link>
   
  </>
)}
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