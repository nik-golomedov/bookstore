import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit";

import { LoginFormValuesI } from "./Login";
import axios from "../../api/axios";
import { initialStateSignI } from "./signupSlice";
import { RootState } from "../store";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formValues: LoginFormValuesI, thunkAPI) => {
    try {
      const response = await axios.post("users/login", formValues);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface initialStateSignInI extends initialStateSignI {}

const initialState: initialStateSignInI = {
  status: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    dropStateRequest(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.status = "";
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;

        if (action.payload.token) {
          localStorage.setItem("isAuth", action.payload.token);
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

export const { dropStateRequest } = loginSlice.actions;

export default loginSlice.reducer;

const loginState = (state: RootState) => state.login;
 
export const loginSuccessSelector = createDraftSafeSelector(loginState,(state) => state.isSuccess);
export const errorLoginSelector = createDraftSafeSelector(loginState,(state) => state.error);
