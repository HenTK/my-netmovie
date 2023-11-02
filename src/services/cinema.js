import axios from "axios";
import { BASE_URL } from "../constants";

export const fetchMovieShowtimesApi = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap`,
    method: "GET",
  });
};
