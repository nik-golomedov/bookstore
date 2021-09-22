import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

import { RootState } from ".";

interface NotificationI {
  socket: Socket | null;
}

const initialState: NotificationI = {
  socket: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSocket(state, action) {
      state.socket = action.payload;
    },
  },
  extraReducers: {},
});

export default appSlice.reducer;

export const { addSocket } = appSlice.actions;

const appState = (state: RootState) => state.app;

export const socketSelector = createDraftSafeSelector(
  appState,
  (state) => state && state.socket,
);
