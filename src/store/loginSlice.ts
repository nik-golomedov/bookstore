import {
  createSlice,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { RootState } from ".";
import { loginApi } from "../api/auth";
import { InitialStateSignI, LoginFormValuesI } from "../interfaces";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formValues: LoginFormValuesI, thunkAPI) => {
    try {
      const response = await loginApi(formValues);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState: InitialStateSignI = {
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;

      if (action.payload.token) {
        localStorage.setItem("isAuth", action.payload.token);
        state.isSuccess = true;
      } else {
        state.error = action.payload.message;
      }
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;

      state.error = action.payload
        ? (action.payload.message as string)
        : "Что то пошло не так";
    });
  },
});

export const { dropStateRequest } = loginSlice.actions;

export default loginSlice.reducer;

const loginState = (state: RootState) => state.login;

export const loginSuccessSelector = createDraftSafeSelector(
  loginState,
  (state) => state.isSuccess,
);

export const errorLoginSelector = createDraftSafeSelector(
  loginState,
  (state) => state.error,
);
