import { useState } from "react";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginSuccess} from "../../redux/slices/authSlice";

const Login = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const [formData, setFormData] = useState({email: "",password: "",});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,});
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);
    console.log(data);

    // Save to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Update Redux Store
    dispatch(
      loginSuccess({
        user: data.user,
        token: data.token,
      })
    );

    toast.success(data.message);

    // Redirect to Home Page
    navigate("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};
return (

<div className="max-w-md mx-auto mt-20 shadow-lg p-8 rounded">

<h2 className="text-3xl font-bold mb-6 text-center">

Login

</h2>

<form onSubmit={handleSubmit}>

<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-3 mb-4 rounded"/>

<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border p-3 mb-4 rounded"/>

<button className="w-full bg-black text-white py-3 rounded">

Login

</button>

</form>

</div>

);

};

export default Login;