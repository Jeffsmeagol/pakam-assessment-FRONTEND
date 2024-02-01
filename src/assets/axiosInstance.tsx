import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Set your API base URL
  headers: {},
});

export default axiosInstance;
