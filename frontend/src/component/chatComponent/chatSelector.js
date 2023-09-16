import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.chat;

export const CHATS_DATA = createSelector(
    [userSelector],
    (chat) => chat.chats
  );

  export const MODE = createSelector(
    [userSelector],
    (chat) => chat.darkMode
  );