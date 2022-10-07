import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
// Store
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Export
export default store;
