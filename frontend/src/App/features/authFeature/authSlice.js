import { createSlice } from "@reduxjs/toolkit";
import { getUserData, githubAuth } from "./authAction";
import { changeName, changeProfilePic } from "../chatFeatures/chatAction";

const initialState = {
  authenticated: false,
  userData: null,
};

const authController = createSlice({
  name: "authController",
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.userData = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(githubAuth.pending, (state) => {
      })
      .addCase(githubAuth.rejected, (state, action) => {})
      .addCase(githubAuth.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload.user;
        localStorage.setItem("jwt", action.payload.jwtToken);
      });
    builder
      .addCase(getUserData.pending, (state) => {})
      .addCase(getUserData.rejected, (state, action) => {})
      .addCase(getUserData.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload.user;
      });
      builder
      .addCase(changeName.pending, (state) => {})
      .addCase(changeName.rejected, (state, action) => {})
      .addCase(changeName.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload.updateUserData;
      });
      builder
      .addCase(changeProfilePic.pending, (state) => {})
      .addCase(changeProfilePic.rejected, (state, action) => {})
      .addCase(changeProfilePic.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload.updateUserData;
      });
  },
});

export const { closeGlobalModal, openGlobalModal , logout } = authController.actions;
export default authController.reducer;
