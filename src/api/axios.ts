import axios from "axios";

import { clearUser } from "../features/userSlice";

const axiosBase = axios.create({
  baseURL: "http://localhost:8000/users",
});

axiosBase.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("isAuth");
    config.headers.Authorization = token ? ` Bearer ${token}` : null;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosBase;
