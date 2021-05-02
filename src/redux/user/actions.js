import * as types from "./types";

export const loginUserRequest = (payload) => ({
  type: types.LOGIN,
  payload,
});

export const registerNewUser = (payload) => ({
  type: types.REGISTER_NEW_USER,
  payload,
});

export const logoutUser = () => ({
  type: types.LOGOUT,
});
