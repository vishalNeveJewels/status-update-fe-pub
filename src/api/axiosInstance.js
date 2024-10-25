import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token'); // Adjust the key as needed

    // If the token exists, add it to the headers
    if (token) {
      // Remove quotes from both sides
      let trimmedToken = token.replace(/^"|"$/g, '');
      config.headers.Authorization = `Bearer ${trimmedToken}`;
    }

    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    switch (status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
    }
    throw error;
  }
);

export default axiosInstance;
