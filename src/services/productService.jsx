import axios from "axios";

const API = "http://localhost:5000/api/v1/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API);
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response);
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};