import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authFeature/authSlice"
import chatReducer from "./features/chatFeatures/chatSlice"



const store = configureStore({
  reducer: {
    user: userReducer,
    chat:chatReducer,
  },
});

export default store;
