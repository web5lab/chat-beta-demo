import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Axios/axiosInstance";

export const getChats = createAsyncThunk("chat/getChat", async () => {
  try {
    const resendOtpResponse = await axiosInstance.get("/chat/get-chat");
    console.log("api data", resendOtpResponse);
    return resendOtpResponse.data?.chats;
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

export const changeName = createAsyncThunk("auth/changeName", async (obj) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`, 
      },
    };
    const resendOtpResponse = await axiosInstance.patch("/auth/update-name",obj,config);
    console.log("api data", resendOtpResponse);
    return resendOtpResponse.data;
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

export const changeProfilePic = createAsyncThunk(
  "auth/changeProfilePic",
  async ({file}) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`, // Assuming your JWT is prefixed with "Bearer "
        },
      };
      const formData = new FormData();
      formData.append("image", file);
      const resendOtpResponse = await axiosInstance.patch(
        "/auth/update-profile-pic",formData,config
      );
      console.log("api data", resendOtpResponse);
      return resendOtpResponse.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

export const postChats = createAsyncThunk(
  "auth/postChat",
  async ({ file, chat }, thunkAPI) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`, // Assuming your JWT is prefixed with "Bearer "
        },
      };
      const formData = new FormData();
      formData.append("image", file);
      formData.append("chat", chat);

      const response = await axiosInstance.post(
        "/chat/post-chat",
        formData,
        config
      );

      if (response.status !== 200) {
        throw new Error("Failed to upload the image");
      }

      return response.data.imagePath;
    } catch (err) {
      throw err;
    }
  }
);
