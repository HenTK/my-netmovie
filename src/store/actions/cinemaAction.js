import { fetchMovieShowtimesApi } from "../../services/cinema";
import { FETCH_CINEMA_DETAIL, FETCH_CINEMA_LIST } from "../types/cinemaType";

export const dispatchCinemaList = (data) => {
  return {
    type: FETCH_CINEMA_LIST,
    payload: data,
  };
};

export const dispatchCinemaDetail = (id) => {
  return {
    type: FETCH_CINEMA_DETAIL,
    payload: id,
  };
};
