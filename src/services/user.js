import axios from "axios";
import { BASE_URL_TICKET } from "../constants";

export const loginApi = () => {
  return axios({
    url: `${BASE_URL_TICKET}/QuanLyNguoiDung`,
    method: "GET",
  });
};

export const registerApi = (infor) => {
  return axios({
    url: `${BASE_URL_TICKET}/QuanLyNguoiDung`,
    method: "POST",
    data: infor,
  });
};

//hệ thống thực tế sẽ có access token trang web và access token người dùng
//server gồm  2 api
// + 1 api chứa chuỗi access token trang web chứa chuỗi tất cả tài khoản và mật khẩu hệ thống (1)
// + 1 api chứa access token trang web và access token đăng nhập người dùng (api đăng nhập riêng mỗi người) (2)
// cách làm post tk, mk, access token web lên (1); (1) trả về tk, mk, ...., access token người dùng để vào (2); lấy access token người dùng xử lý để access vào (2); quá trình xử lý gọi là middleware
//ở trên chỉ giả lập, không có access token
