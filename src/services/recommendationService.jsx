import api from "./api";

export const recommendationService = async (productId) => {
  const { data } = await api.get(`/recommendations/${productId}`);

  return data;
};