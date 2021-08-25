import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LoginFormValuesI } from "../app/Login";
import axios from "../api/axios";
import { initialStateSignI } from "./signupSlice";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formValues: LoginFormValuesI) => {
    try {
      const response = await axios.post("/login", formValues);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
interface initialStateSignInI extends initialStateSignI {
    auth:boolean
}
const initialState: initialStateSignInI = {
  status: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
  auth:false
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    dropStateRequest(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error=null
      state.status = "";
    },
    auth(state) {
    state.auth = false   
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isFetching = true;
      state.status = "";
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        
        if (action.payload.token) {
          localStorage.setItem("isAuth", action.payload.token);
          
          if (localStorage.getItem("isAuth")) {
              
              state.auth=true
          }
          
          state.isSuccess = true;
          state.status = "Success";
        } else {
          state.error = action.payload.message;
        }
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {dropStateRequest, auth} = loginSlice.actions

export default loginSlice.reducer;
