import api from "./api";

// AI Product Search
export const searchAIProducts = async (prompt) => {
  const { data } = await api.post("/ai/search", {
    prompt,
  });

  return data;
};