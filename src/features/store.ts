import { combineReducers, configureStore } from "@reduxjs/toolkit";

import signUpReducer from "./signupSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import booksReducer from "./bookSlice";
import { initResponseInt } from "../api/axios";

const reducers = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
  user: userReducer,
  books: booksReducer,
});


const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: loginReducer,
    user: userReducer,
    books: booksReducer,
  },
});

initResponseInt(store)

export default store;

export type StoreType = typeof store 

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
