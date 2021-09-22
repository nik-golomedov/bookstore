import {
  createSlice,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { deleteNotificationApi, getNotificationApi } from "../api/notification";
import { DataNotificationI } from "../../interfaces";
import { RootState } from ".";

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (_, thunkAPI) => {
    try {
      const response = await getNotificationApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id: number, thunkAPI) => {
    try {
      const response = await deleteNotificationApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

interface NotificationI {
  isLoadingGet: boolean;
  isSuccessGet: boolean;
  isErrorGet: boolean;
  data: DataNotificationI[];
}

const initialState: NotificationI = {
  isLoadingGet: false,
  isSuccessGet: false,
  isErrorGet: false,
  data: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotification.pending, (state) => {
      state.isSuccessGet = false;
      state.isLoadingGet = true;
      state.isErrorGet = false;
    });
    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.isSuccessGet = true;
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.data = action.payload;
    });
    builder.addCase(getNotification.rejected, (state) => {
      state.isSuccessGet = false;
      state.isLoadingGet = false;
      state.isErrorGet = true;
    });
  },
});

export default notificationSlice.reducer;

const notificationState = (state: RootState) => state.notifications;

export const notificationSelector = createDraftSafeSelector(
  notificationState,
  (state) => state && state.data,
);
