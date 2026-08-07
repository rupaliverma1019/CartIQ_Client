import axios from "axios";

const API = "http://localhost:5000/api/v1";

export const getPersonalRecommendations  = async(token) =>{
    const {data} = await axios.get(`${API}/recommendations/personal`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )

    return data;
}