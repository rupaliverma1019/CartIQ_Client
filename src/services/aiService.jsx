import axios from "axios";

const API = "http://localhost:5000/api/v1/ai";

export const searchAIProducts = async (prompt) => {
  const response = await axios.post(
    `${API}/search`,
    { prompt }
  );

  return response.data;
};