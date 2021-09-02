import axios, { AxiosInstance } from "axios";
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
    return Promise.reject(error);
  }
);

export const initResponseInt = (store:any) => {
  axiosBase.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      store.dispatch(clearUser());
      localStorage.removeItem("isAuth");
      return Promise.reject(error);
    }
  );
};

export default axiosBase;
