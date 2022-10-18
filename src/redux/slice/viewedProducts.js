import { createSlice } from "@reduxjs/toolkit";

const viewedProducts = createSlice({
  name: "viewedProducts",
  initialState: {
    products: [],
  },
  reducers: {
    addViewedsProducts: (state, action) => {
      if (state.products.length === 0 && action.payload._id)
        state.products.push(action.payload);
      if (state.products.length > 0) {
        const indexItem = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (indexItem === -1) {
          state.products.unshift(action.payload);
        }
        if (state.products.length > 8) {
          state.products.pop();
        }
      }
    },
  },
});

export const { addViewedsProducts } = viewedProducts.actions;

export default viewedProducts.reducer;
