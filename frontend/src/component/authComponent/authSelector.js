import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.user;

export const AUTHENTICRNTED = createSelector(
    [userSelector],
    (user) => user.authenticated
  );

  export const USER_DATA = createSelector(
    [userSelector],
    (user) => user.userData
  );