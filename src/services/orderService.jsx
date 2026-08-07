import axios from "axios";

const API = "http://localhost:5000/api/v1/orders";

export const createOrder = async (orderData, token) => {
  const response = await axios.post(
    API,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async (token) => {
  const response = await axios.get(
    `${API}/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getOrderDetails = async (
  id,
  token
) => {

  const response = await axios.get(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllOrders = async (token) => {

    const response = await axios.get(

        `${API}/admin`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

};

export const updateOrderStatus = async (
  id,
  status,
  token
) => {

  const response = await axios.put(
    `${API}/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};