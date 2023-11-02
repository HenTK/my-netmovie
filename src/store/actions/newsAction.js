import { FETCH_NEWS_LIST } from "../types/newsType";

export const dispatchNewsList = (data) => {
  return {
    type: FETCH_NEWS_LIST,
    payload: data,
  };
};
