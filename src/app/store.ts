import { combineReducers, configureStore } from "@reduxjs/toolkit";

import signUpReducer from "../features/signupSlice";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { string } from "yup/lib/locale";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const reducers = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
  user: userReducer,
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

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
