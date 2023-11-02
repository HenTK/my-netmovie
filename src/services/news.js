import axios from "axios";
import { BASE_URL_NEWS } from "../constants";

export const fetchNewsListApi = () => {
  return axios({
    url: `${BASE_URL_NEWS}/QuanLyTinTuc`,
    method: "GET",
  });
};
