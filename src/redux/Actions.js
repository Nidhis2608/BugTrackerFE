import { LOGIN, LOGOUT, SETBUGDATA } from "./ActionTypes";

export const loginaction = () => ({
  type: LOGIN,
});

export const logoutaction = () => ({
  type: LOGOUT,
});

export const setbugdata = (data) => ({
  type: SETBUGDATA,
  payload: data,
});
