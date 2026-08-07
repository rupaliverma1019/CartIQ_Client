import axios from "axios";

const API = "http://localhost:5000/api/v1/wishlist";

// Add product to wishlist
export const addToWishlist = async (productID, token) => {
  const { data } = await axios.post(
    API,
    { productID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Get wishlist
export const getWishlist = async (token) => {
  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Remove wishlist item
export const removeWishlist = async (
  productID,
  token
) => {
  const { data } = await axios.delete(
    `${API}/${productID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Check wishlist
export const checkWishlist = async (
  productID,
  token
) => {
  const { data } = await axios.get(
    `${API}/check/${productID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

