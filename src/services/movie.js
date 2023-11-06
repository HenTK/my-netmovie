import axios from "axios";
import { BASE_URL } from "../constants";
import { data } from "jquery";

export const fetchMovieListApi = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim`,
    method: "GET",
    // headers: {
    //   TokenCybersoft: "",
    // },
  });
};

export const fectMovieDetailApi = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim`,
    method: "GET",
  });
};

export const addMovieListApi = (data) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim`,
    method: "POST",
    data: data,
  });
};

export const editMovieDetailApi = (data, id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/${id}`,
    method: "PUT",
    data: data,
  });
};

export const deleteMovieDetailApi = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/${id}`,
    method: "DELETE",
  });
};
