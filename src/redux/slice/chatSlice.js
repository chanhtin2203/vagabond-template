import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const getMessagesByConversation = createAsyncThunk(
  "chats/getMessagesByConversation",
  async ({ id }) => {
    const res = await axios.get(`${BASE_URL}/chat/message?idUser=${id}`);
    return res.data;
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    loading: false,
    chats: [],
  },
  extraReducers: {
    // getListComments
    [getMessagesByConversation.pending]: (state) => {
      state.isLoading = true;
    },
    [getMessagesByConversation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chats = action.payload;
    },
    [getMessagesByConversation.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default chatsSlice.reducer;
