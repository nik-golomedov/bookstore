import { configureStore } from "@reduxjs/toolkit";

import signUpReducer from "./auth/signupSlice";
import loginReducer from "./auth/loginSlice";
import userReducer from "./auth/userSlice";
import booksReducer from "./books/bookSlice";
import { initResponseInt } from "../api/axios";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: loginReducer,
    user: userReducer,
    books: booksReducer,
  },
});

initResponseInt(store);

export default store;

export type StoreType = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
