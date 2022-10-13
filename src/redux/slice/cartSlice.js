import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productId = state.products.find(
        (p) => p._id === action.payload._id
      );
      if (!productId) {
        state.products.push(action.payload);
      } else {
        let newCart = state.products;
        const objIndex = newCart.findIndex(
          (obj) => obj._id === action.payload._id
        );
        if (newCart[objIndex].quantity === undefined) {
          newCart[objIndex].quantity = 2;
        } else {
          newCart[objIndex].quantity =
            newCart[objIndex].quantity + action.payload.quantity;
        }
        state.products = [...newCart];
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      let newCart = state.products;
      const objIndex = newCart.findIndex(
        (obj) => obj._id === action.payload._id
      );
      newCart.splice(objIndex, 1);
      state.products = [...newCart];
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseProduct: (state, action) => {
      let newCart = state.products;
      const objIndex = newCart.findIndex(
        (obj) => obj._id === action.payload._id
      );
      newCart[objIndex].quantity += 1;
      state.total += action.payload.price;
    },
    decreaseProduct: (state, action) => {
      let newCart = state.products;
      const objIndex = newCart.findIndex(
        (obj) => obj._id === action.payload._id
      );
      newCart[objIndex].quantity -= 1;
      state.total -= action.payload.price;
    },
  },
});

export const { addProduct, deleteProduct, increaseProduct, decreaseProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
