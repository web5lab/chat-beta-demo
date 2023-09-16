import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Axios/axiosInstance"

export const githubAuth = createAsyncThunk("auth/githubAuth", async (code) => {
  try {
    const resendOtpResponse = await axiosInstance.get(
      `/auth/oauth-github?code=${code}`
    );
    return resendOtpResponse.data;
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

export const getUserData = createAsyncThunk("auth/getUserData", async (jwt) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`, // Assuming your JWT is prefixed with "Bearer "
        },
      };
      const resendOtpResponse = await axiosInstance.get(
        "/auth/get-user",config
      );
      console.log("api data", resendOtpResponse);
      return resendOtpResponse.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  });


