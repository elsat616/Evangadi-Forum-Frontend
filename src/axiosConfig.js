import axios from "axios";
const axiosBase = axios.create({
  baseURL: "http://localhost:2024/api",
});
export default axiosBase;
