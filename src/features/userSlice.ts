import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  try {
    const response = await axios.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

interface UserProfileI {
  data: object;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: UserProfileI = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state, action) => {
        state.isSuccess = false
        state.isLoading = true
        state.isError = false
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.data = action.payload
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
    });
  },
});

export default userSlice.reducer
