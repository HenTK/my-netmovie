import { FETCH_LOGIN_USER_INFO } from "../types/loginType";
import { FETCH_LOGOUT_USER_INFO } from "../types/loginType";

export const dispatchLoginUserInfo = (data) => {
  return {
    type: FETCH_LOGIN_USER_INFO,
    payload: data,
  };
};

export const dispatchLogoutUserInfo = (data) => {
  return {
    type: FETCH_LOGOUT_USER_INFO,
    payload: data,
  };
};
