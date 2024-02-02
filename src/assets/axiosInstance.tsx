import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pakam-assessment-api.onrender.com", //https://pakam-assessment-api.onrender.com
  headers: {},
});

export default axiosInstance;
