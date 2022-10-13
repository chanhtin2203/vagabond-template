import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";

// Store
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["carts", "users"],
};
const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Export
export let persistor = persistStore(store);
