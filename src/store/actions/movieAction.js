import axios from "axios";
import { fetchMovieListApi } from "../../services/movie";
import { FETCH_MOVIE_DETAIL, FETCH_MOVIE_LIST } from "../types/movieType";

export const dispatchMovieList = () => {
  return async (dispatch) => {
    const result = await fetchMovieListApi();

    dispatch({
      type: FETCH_MOVIE_LIST,
      payload: result.data,
    });
  };
};

export const dispatchMovieDetail = (id) => {
  return {
    type: FETCH_MOVIE_DETAIL,
    payload: id,
  };
};
