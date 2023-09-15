import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalModal:false,
};

const globalController = createSlice({
  name: "gameController",
  initialState,
  reducers: {
    closeGlobalModal: (state ) => {
      state.globalModal = false;
    },
    openGlobalModal: (state) => {
      state.globalModal = true;
    }
  },
});

export const { closeGlobalModal, openGlobalModal } = globalController.actions;
export default globalController.reducer;
