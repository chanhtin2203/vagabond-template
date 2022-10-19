import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Utils/BaseUrl";

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async ({ id, dataOrders, accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/orders/`, dataOrders, {
      headers: { token: `Beaer ${accessToken}` },
      param: { id: id },
    });
    return res.data;
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/orders/find/${id}`, {
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
    // create new orders
    [createNewOrder.pending]: (state) => {
      state.isFetching = true;
    },
    [createNewOrder.fulfilled]: (state) => {
      state.isFetching = false;
    },
    [createNewOrder.rejected]: (state) => {
      state.isFetching = false;
    },
    // get all orders
    [getAllOrders.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    [getAllOrders.rejected]: (state) => {
      state.isFetching = false;
    },
  },
});

export default orders.reducer;
