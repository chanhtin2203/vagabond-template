import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, user);
  return res.data;
});

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/auth/logout`, null, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const changePasswordUser = createAsyncThunk(
  "auth/changePasswordUser",
  async ({ values, id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.put(`${BASE_URL}/user/password/${id}`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    login: null,
    isFetching: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login = action.payload;
    },
    updateAdmin: (state, action) => {
      state.login = state.login._id === action.payload._id && {
        ...state.login,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      action.payload.message
        ? (state.login = null)
        : (state.login = action.payload);
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // logout
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

export const { loginSuccess, updateAdmin } = auth.actions;

export default auth.reducer;
