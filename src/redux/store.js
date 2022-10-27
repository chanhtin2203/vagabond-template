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
import ordersReducer from "./slice/orderSlice";
import viewsProductReducer from "./slice/viewedProducts";
import authReducer from "./slice/authSlice";

// Store
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["carts", "auth", "views"],
};
const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  users: userReducer,
  orders: ordersReducer,
  views: viewsProductReducer,
  auth: authReducer,
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
