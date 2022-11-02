import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Utils/BaseUrl";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/user/find/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ values, id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.put(`${BASE_URL}/user/edit/${id}`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async ({ accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/user`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async ({ search, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/user?search=${search}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const getDetailUser = createAsyncThunk(
  "user/getDetailUser",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.get(`${BASE_URL}/user/find/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const updateUserByAdmin = createAsyncThunk(
  "user/updateUserByAdmin",
  async ({ values, id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.put(`${BASE_URL}/user/update/${id}`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "user/deleteUserByAdmin",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.delete(`${BASE_URL}/user/delete/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const user = createSlice({
  name: "user",
  initialState: {
    users: null,
    user: {},
    isFetching: false,
  },

  extraReducers: {
    // get user
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // edit user
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [editUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // get all user
    [getAllUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getAllUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // search user
    [searchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [searchUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // get detail user
    [getDetailUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getDetailUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // update user by admin
    [updateUserByAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    [updateUserByAdmin.rejected]: (state) => {
      state.isLoading = false;
    },
    // delete user by admin
    [deleteUserByAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteUserByAdmin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default user.reducer;
