import axios from "axios";


// Создаем экземпляр axios с базовыми настройками
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||  "https://react2023-backend.vercel.app/" // "http://localhost:4444"
});

// Добавляем interceptor для всех запросов
instance.interceptors.request.use((config) => {
  // Получаем токен авторизации из localStorage
  const token = localStorage.getItem('token');

  // Добавляем заголовок Authorization со значением "Bearer токен"
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default instance;