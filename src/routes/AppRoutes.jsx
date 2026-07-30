import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Admin/Dashboard";
import Unauthorized from "../pages/Unauthorized";
import ProductDetails from "../pages/Product/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected User Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Route */}
      <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>    }/>
      <Route  path="/payment"  element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
<Route  path="/order-success"  element={<OrderSuccess />}/> 
<Route  path="/my-orders"  element={<MyOrders />}/>
<Route  path="/orders/:id"  element={<OrderDetails />}/>
   </Routes>
    
    
  );
};

export default AppRoutes;