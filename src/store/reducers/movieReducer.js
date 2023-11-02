import { FETCH_MOVIE_DETAIL, FETCH_MOVIE_LIST } from "../types/movieType";

const DEFAULT_STATE = {
  movieList: [],
  movieDetail: [],
};

export const movieReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MOVIE_LIST:
      {
        state.movieList = payload;
      }
      break;
    case FETCH_MOVIE_DETAIL:
      {
        const data = [...state.movieList];
        const result = data.filter((ele) => ele.maPhim === payload);
        state.movieDetail = result;
      }
      break;

    default:
      break;
  }
  return { ...state };
};
