import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValuesI } from "../app/SignUp";

import axios from "../api/axios";

export interface initialStateSignI {
  status: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  
}

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (formValues: FormValuesI) => {
    try {
      const response = await axios.post("/registration", formValues);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: initialStateSignI = {
  status: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    dropStatus(state) {
      state.status = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isFetching = true;
      state.status = ""
    }),
      builder.addCase(signUpUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
         state.status = action.payload.message
      }),
      builder.addCase(signUpUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {dropStatus} = signUpSlice.actions

export default signUpSlice.reducer;
