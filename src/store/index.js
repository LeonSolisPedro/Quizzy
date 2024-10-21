import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//This is mine
import userSlice from "./user";

//Config
const persistConfig = {
  key: "root",
  storage,
};

// This is mine
const persistentUser = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistentUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);