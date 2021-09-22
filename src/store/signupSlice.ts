import {
  createSlice,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { signUpApi } from "../api/auth";
import { RootState } from ".";
import { SignUpFormValuesI, InitialStateSignI } from "../../interfaces";

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (formValues: SignUpFormValuesI, thunkAPI) => {
    try {
      const response = await signUpApi(formValues);
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

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearStatus(state) {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.status = "";
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      state.status = action.payload.message;
    });
    builder.addCase(signUpUser.rejected, (state, action: any) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.status = action.payload
        ? (action.payload.message as string)
        : "Что то пошло не так";
      state.error = action ? action.payload : "Ошибка";
    });
  },
});

export const { clearStatus } = signUpSlice.actions;

export default signUpSlice.reducer;

const signUpState = (state: RootState) => state.signUp;

export const statusSelector = createDraftSafeSelector(
  signUpState,
  (state) => state.status,
);
