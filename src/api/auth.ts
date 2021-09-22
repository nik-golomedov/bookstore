import axios from "./axios";

import { SignUpFormValuesI, LoginFormValuesI } from "../../interfaces";

export const signUpApi = (formValues: SignUpFormValuesI) =>
  axios.post("users/registration", formValues);
export const loginApi = (formValues: LoginFormValuesI) =>
  axios.post("users/login", formValues);
export const getUserProfileApi = () => axios.get("/users/get-profile");
