import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

export const getAllConversationList = createAsyncThunk(
  "chats/getAllConversationList",
  async () => {
    const res = await axios.get(`${BASE_URL}/chat`);
    return res.data;
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    loading: false,
    conversationList: [],
  },
  reducers: {
    updateIdConversation: (state, action) => {
      return {
        ...state,
        idConversation: action.payload?._id,
        nameConversation: action.payload?.nameConversation,
      };
    },
    updateLastMessageConversation: (state, action) => {
      const arr = [...state.conversationList];
      const index = arr.findIndex(
        (item) => item.idUser === action.payload?.idUser
      );
      arr[index] = action.payload;

      return { ...state, conversationList: arr };
    },
    showConversation: (state, action) => {
      const arr = [...state.conversationList];
      const index = arr.findIndex(
        (item) => item.idUser === action.payload?.idUser
      );
      const newConversation = action.payload;
      if (index < 0) {
        arr.push(newConversation);
      }

      return { ...state, conversationList: arr };
    },
  },
  extraReducers: {
    // getListComments
    [getAllConversationList.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllConversationList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.conversationList = action.payload;
    },
    [getAllConversationList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  updateIdConversation,
  updateLastMessageConversation,
  showConversation,
} = chatsSlice.actions;

export default chatsSlice.reducer;
