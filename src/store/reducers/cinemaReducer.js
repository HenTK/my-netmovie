import { FETCH_CINEMA_DETAIL, FETCH_CINEMA_LIST } from "../types/cinemaType";

const DEFAULT_STATE = {
  cinemaList: [],
  cinemaDetail: [],
};

export const cinemaReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CINEMA_LIST:
      {
        const data = JSON.parse(JSON.stringify(payload));
        state.cinemaList = data;
      }
      break;
    case FETCH_CINEMA_DETAIL:
      {
      }
      break;

    default:
      break;
  }
  return { ...state };
};
