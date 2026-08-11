import api from "./api";

export const recommendationService = async (productId) => {
  const { data } = await api.get(`/recommendations/${productId}`);

  return data;
};


export const getPersonalizedRecommendations = async (token) => { 
  const { data } = await api.get("/recommendations/personalized", 
    {
       headers:
        { Authorization: `Bearer ${token}`, },
   });
    return data;
   };