import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let { _id, size } = action.payload;
      const itemIndex = state.products.findIndex(
        (item) => item._id === _id && item.size === size
      );
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += action.payload.quantity;
      } else {
        state.products.push({
          ...action.payload,
        });
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, { payload }) => {
      const found = state.products.findIndex(
        ({ _id, size }) => _id === payload._id && size === payload.size
      );
      if (found !== -1) {
        state.products.splice(found, 1);
      }
      state.total -= payload.price * payload.quantity;
    },
    increaseProduct: (state, { payload }) => {
      const found = state.products.findIndex(
        ({ _id, size }) => _id === payload._id && size === payload.size
      );
      if (found !== -1) {
        state.products[found].quantity++;
      }
      state.total += payload.price;
    },
    decreaseProduct: (state, { payload }) => {
      const found = state.products.findIndex(
        ({ _id, size }) => _id === payload._id && size === payload.size
      );
      if (found !== -1) {
        state.products[found].quantity--;
      }
      state.total -= payload.price;
    },
    deleteAllCart: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseProduct,
  decreaseProduct,
  deleteAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
