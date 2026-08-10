import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const getProducts = async (filters) => {
   const response = await axios.get(
    API,
    {
      params: filters,
    }
  );

  return response.data;

};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/v1/products/${id}`);
  return response.data;
};

export const createProduct = async (
  formData,
  token
) => {

  const response = await axios.post(
    API,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};

export const deleteProduct = async (
  id,
  token
) => {

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

export const restoreProduct = async (
  id,
  token
) => {

  const response = await axios.put(
    `${API}/restore/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProduct = async (
  id,
  formData,
  token
) => {

  const response = await axios.put(
    `${API}/${id}`,
    formData,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    }
  );

  return response.data;

};