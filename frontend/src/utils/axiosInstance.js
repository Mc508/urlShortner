import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  withCredentials: true,
});

export function handleAxiosError(error) {
  if (error.response) {
    // Request made and server responded with a status code not in 2xx
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        console.error("Bad Request:", data?.message || data);
        break;
      case 401:
        console.error("Unauthorized:", data?.message || "Login required");
        break;
      case 403:
        console.error("Forbidden:", data?.message || "Access denied");
        break;
      case 404:
        console.error("Not Found:", data?.message || "Resource not found");
        break;
      case 500:
        console.error(
          "Server Error:",
          data?.message || "Something went wrong on the server"
        );
        break;
      default:
        console.error(`Error ${status}:`, data?.message || data);
    }
  } else if (error.request) {
    // Request made but no response received
    console.error("No response received:", error.request);
  } else {
    // Something happened in setting up the request
    console.error("Error setting up request:", error.message);
  }

  // Optional: throw error again if needed
  throw error;
}
