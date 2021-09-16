import {
  createSlice,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { RootState } from ".";
import { getUserProfileApi } from "../api/auth";
import { UserI } from "../interfaces";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfileApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

interface UserProfileI {
  user: UserI | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: UserProfileI = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;

const userState = (state: RootState) => state.user;

export const userIdSelector = createDraftSafeSelector(
  userState,
  (state) => state.user && state.user.id,
);

export const isAuthSelector = createDraftSafeSelector(
  userState,
  (state) => state && state.user,
);

export const isSuccessUserSelector = createDraftSafeSelector(
  userState,
  (state) => state && state.isSuccess,
);
export const isErrorUserSelector = createDraftSafeSelector(
  userState,
  (state) => state && state.isError,
);
