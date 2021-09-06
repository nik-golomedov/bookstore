import axios, { AxiosInstance } from "axios";
import { clearUser } from "../features/auth/userSlice";

const axiosBase = axios.create({
  baseURL: "http://localhost:8000",
});

axiosBase.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("isAuth");
    config.headers.Authorization = token ? ` Bearer ${token}` : null;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const initResponseInt = (store: any) => {
  axiosBase.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        store.dispatch(clearUser());
        localStorage.removeItem("isAuth");
        return Promise.reject(error);
      }
    }
  );
};

export default axiosBase;
