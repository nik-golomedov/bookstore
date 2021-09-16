import { SignUpFormValuesI, LoginFormValuesI } from "../interfaces";
import axios from "./axios";

export const signUpApi = (formValues: SignUpFormValuesI) =>
  axios.post("users/registration", formValues);
export const loginApi = (formValues: LoginFormValuesI) =>
  axios.post("users/login", formValues);
export const getUserProfileApi = () => axios.get("/users/get-profile");
