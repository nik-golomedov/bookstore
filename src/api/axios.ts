import axios from "axios";

 const axiosBase = axios.create({
  baseURL: "http://localhost:8000/users",
});

export default axiosBase

axios.interceptors.request.use(function (config) {
  {
    headers: { Authorization: `Bearer ${localStorage.getItem("isAuth")}` }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

// axios.interceptors
// sleep
// status401 logoutuser