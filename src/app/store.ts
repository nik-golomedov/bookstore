import { combineReducers, configureStore } from "@reduxjs/toolkit";

import signUpReducer from "../features/signupSlice";
import loginReducer from "../features/loginSlice";
import userReducer, { clearUser } from "../features/userSlice";
import booksReducer from "../features/bookSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import axiosBase from "../api/axios";

const reducers = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
  user: userReducer,
  books: booksReducer,
});

interface persistConfigI {
  key: string;
  storage: any;
}

const persistConfig: persistConfigI = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

axiosBase.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    store.dispatch(clearUser());
    return Promise.reject(error);
  }
);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
