import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow sending cookies with requests
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include token in Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response, // Return response if no errors
  (error) => {
    if (error.response) {
      // Log the error and include a custom message
      console.error(
        "API Error:",
        error.response.status,
        error.response.data?.message || error.response.statusText
      );

      // Optional: Redirect to login if the status is 401 (Unauthorized)
      if (error.response.status === 401) {
        localStorage.removeItem("authToken"); // Clear invalid token
        window.location.href = "/"; // Redirect to login page
      }
    } else if (error.request) {
      // Handle network errors
      console.error("API Error: No response received from the server.");
    } else {
      console.error("API Error: Request setup issue.", error.message);
    }

    return Promise.reject(
      error.response?.data?.message || "An error occurred. Please try again."
    );
  }
);

// Function to handle GET requests
export const get = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

// Function to handle POST requests
export const post = async (endpoint, data = {}) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

// Function to handle PUT requests
export const put = async (endpoint, data = {}) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

// Function to handle DELETE requests
export const remove = async (endpoint, params = {}) => {
  const response = await api.delete(endpoint, { params });
  return response.data;
};

// Function to handle PATCH requests
export const patch = async (endpoint, data = {}) => {
  const response = await api.patch(endpoint, data);
  return response.data;
};

// Error handler (Used internally or externally as needed)
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  throw new Error(error.response?.data?.message || "Something went wrong");
};

// Export the utility functions and the Axios instance
export default {
  get,
  post,
  put,
  remove,
  patch,
  api, // Export the Axios instance for flexibility
};
