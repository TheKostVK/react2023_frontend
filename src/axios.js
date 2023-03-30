import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://react2023-backend.vercel.app/" // "http://localhost:4444" ,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Что-то пошло не так");
    }
    throw error;
  }
);

export default instance;
