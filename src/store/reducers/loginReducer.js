import {
  FETCH_LOGIN_USER_INFO,
  FETCH_LOGOUT_USER_INFO,
} from "../types/loginType";

const DEFAULT_STATE = {
  userList: [],
  userDetail: { id: "", taiKhoan: "", quanTri: "" },
};

if (localStorage.getItem("USER_INFO_KEY")) {
  const data = JSON.parse(localStorage.getItem("USER_INFO_KEY"));
  // console.log(data);
  DEFAULT_STATE.userDetail.id = data?.id;
  DEFAULT_STATE.userDetail.taiKhoan = data?.taiKhoan;
  DEFAULT_STATE.userDetail.quanTri = data?.quanTri;
}

export const loginReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LOGIN_USER_INFO:
      {
        state.userDetail = payload;
        // console.log(payload, "user current");
      }
      break;
    case FETCH_LOGOUT_USER_INFO: {
      state.userDetail = { id: "", taiKhoan: "", quanTri: "" };
      localStorage.removeItem("USER_INFO_KEY");
      // console.log("Logout acc reducer");
    }
    default:
      break;
  }
  return { ...state };
};
