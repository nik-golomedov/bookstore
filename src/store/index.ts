import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { initResponseInt } from "../api/axios";
import booksReducer from "./bookSlice";
import loginReducer from "./loginSlice";
import notificationReducer from "./notificationSlice";
import signUpReducer from "./signupSlice";
import userReducer from "./userSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: loginReducer,
    user: userReducer,
    books: booksReducer,
    notifications: notificationReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

initResponseInt(store);

export default store;

export type StoreType = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
