import api from "./api";

export const getPersonalRecommendations = async (token) => {
  const { data } = await api.get("/recommendations/personal", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};