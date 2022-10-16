import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async ({ data, accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/orders`, data, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const orders = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    isFetching: false,
  },
  extraReducers: {
    [createNewOrder.pending]: (state) => {
      state.isFetching = true;
    },
    [createNewOrder.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    [createNewOrder.rejected]: (state) => {
      state.isFetching = false;
    },
  },
});

export default orders.reducer;
