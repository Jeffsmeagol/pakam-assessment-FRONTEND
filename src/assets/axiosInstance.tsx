import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pakam-assessment-api.onrender.com", //https://pakam-assessment-api.onrender.com http://localhost:4000
  headers: {},
});

export default axiosInstance;
