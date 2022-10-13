import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, user);
  return res.data;
});

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/auth/logout`, id, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const user = createSlice({
  name: "user",
  initialState: {
    login: null,
    isFetching: false,
  },
  extraReducers: {
    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.login = null;
    },
    [logoutUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default user.reducer;
