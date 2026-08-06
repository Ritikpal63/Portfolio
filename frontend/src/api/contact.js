import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API URL", API_BASE_URL);

export const sendContactMessage = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/contact`, formData);

  return response.data;
};  
