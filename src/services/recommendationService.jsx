import axios from "axios";

export const recommendationService = async (productId) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/recommendations/${productId}`
  );

  return data;
};