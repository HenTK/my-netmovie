import { FETCH_NEWS_LIST } from "../types/newsType";

const DEFAULT_STATE = {
  newsList: [],
  newsDetail: [],
};

export const newsReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_NEWS_LIST:
      {
        // console.log(payload);
        state.newsList = payload;
      }
      break;

    default:
      break;
  }
  return { ...state };
};
