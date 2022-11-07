import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const getListComments = createAsyncThunk(
  "comments/getListComments",
  async ({ id, page }) => {
    const res = await axios.get(`${BASE_URL}/comments/${id}`);
    return res.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    loading: false,
    comments: [],
  },
  extraReducers: {
    // getListComments
    [getListComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getListComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [getListComments.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default commentsSlice.reducer;
