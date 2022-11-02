import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Utils/BaseUrl";

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async ({ id, dataOrders, accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/orders`, dataOrders, {
      params: { id: id },
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const getAllOrdersUser = createAsyncThunk(
  "orders/getAllOrdersUser",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/orders/find/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async ({ key, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(
      key ? `${BASE_URL}/orders?key=${key}` : `${BASE_URL}/orders`,
      {
        headers: { token: `Beaer ${accessToken}` },
      }
    );
    return res.data;
  }
);

export const getDetailOrders = createAsyncThunk(
  "orders/getDetailOrders",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/orders/detail/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const updateOrders = createAsyncThunk(
  "orders/updateOrders",
  async ({ id, values, accessToken, axiosJWT }) => {
    const res = await axiosJWT.put(`${BASE_URL}/orders/edit/${id}`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const getIncomeOrders = createAsyncThunk(
  "orders/getIncomeOrders",
  async ({ accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/orders/income`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const orders = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
    allOrders: [],
    income: null,
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
    // get all orders user
    [getAllOrdersUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllOrdersUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    [getAllOrdersUser.rejected]: (state) => {
      state.isFetching = false;
    },
    // get all orders
    [getAllOrders.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.allOrders = action.payload;
    },
    [getAllOrders.rejected]: (state) => {
      state.isFetching = false;
    },
    // get income orders
    [getIncomeOrders.pending]: (state) => {
      state.isFetching = true;
    },
    [getIncomeOrders.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.income = action.payload;
    },
    [getIncomeOrders.rejected]: (state) => {
      state.isFetching = false;
    },
    // get detail orders
    [getDetailOrders.pending]: (state) => {
      state.isFetching = true;
    },
    [getDetailOrders.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    [getDetailOrders.rejected]: (state) => {
      state.isFetching = false;
    },
    // get detail orders
    [updateOrders.pending]: (state) => {
      state.isFetching = true;
    },
    [updateOrders.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.allOrders = state.allOrders.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    [updateOrders.rejected]: (state) => {
      state.isFetching = false;
    },
  },
});

export default orders.reducer;
