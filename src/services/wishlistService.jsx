import api from "./api";

// Add product to wishlist
export const addToWishlist = async (productID, token) => {
  const { data } = await api.post(
    "/wishlist",
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
  const { data } = await api.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Remove wishlist item
export const removeWishlist = async (productID, token) => {
  const { data } = await api.delete(`/wishlist/${productID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Check wishlist
export const checkWishlist = async (productID, token) => {
  const { data } = await api.get(`/wishlist/check/${productID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// AI Smart Wishlist
export const getSmartWishlist = async (token) => {
  const { data } = await api.get("/wishlist/smart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};