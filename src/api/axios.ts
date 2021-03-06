import axios from "axios";

import { clearUser } from "../store/userSlice";

export const BASE_URL = "http://localhost:8000";

const axiosBase = axios.create({
  baseURL: BASE_URL,
});

axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("isAuth");
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? ` Bearer ${token}` : null;
    return config;
  },
  (error) => Promise.reject(error),
);

export const initResponseInt = (store: any) => {
  axiosBase.interceptors.response.use(
    (response) => response,
    // eslint-disable-next-line consistent-return
    (error) => {
      if (error.response.status === 401) {
        store.dispatch(clearUser());
        localStorage.removeItem("isAuth");
      }
      return Promise.reject(error);
    },
  );
};

export default axiosBase;
