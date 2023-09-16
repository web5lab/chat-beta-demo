import { createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chatAction";

const initialState = {
  chats: [],
  darkMode: false,
};

const chatController = createSlice({
  name: "chatController",
  initialState,
  reducers: {
    darkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    updateProfilePicture: (state, action) => {
      const { userId, ProfilePic } = action.payload;
      for (const message of state.chats) {
        if (
          message.userDetails &&
          message.userDetails._id === userId &&
          message.userDetails.profilePic !== ProfilePic
        ) {
          message.userDetails.profilePic = ProfilePic;
        }
      }
    },
    updatename: (state, action) => {
      const { userId, name } = action.payload;
      for (const message of state.chats) {
        if (
          message.userDetails &&
          message.userDetails._id === userId &&
          message.userDetails.name !== name
        ) {
          message.userDetails.name = name;
        }
      }
    },
    addChat: (state, action) =>{
      console.log("socket data",action.payload);
      state.chats = [...state.chats, action.payload];
    },},
    extraReducers: (builder) => {
      builder
        .addCase(getChats.pending, (state) => {})
        .addCase(getChats.rejected, (state, action) => {})
        .addCase(getChats.fulfilled, (state, action) => {
          state.chats = action.payload;
        });
        
    },
  
});

export const {  addChat , updateProfilePicture , updatename} = chatController.actions;
export default chatController.reducer;
