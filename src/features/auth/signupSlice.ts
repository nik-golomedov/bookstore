import {
  createSlice,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { FormValuesI } from "./SignUp";
import axios from "../../api/axios";
import { RootState } from "../store";

export interface initialStateSignI {
  status: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (formValues: FormValuesI, thunkAPI) => {
    try {
      const response = await axios.post("users/registration", formValues);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    clearStatus(state) {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isFetching = true;
      state.status = "";
    }),
      builder.addCase(signUpUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.status = action.payload.message;
      }),
      builder.addCase(signUpUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = signUpSlice.actions;

export default signUpSlice.reducer;

const signUpState = (state: RootState) => state.signUp;

export const statusSelector = createDraftSafeSelector(
  signUpState,
  (state) => state.status
);
