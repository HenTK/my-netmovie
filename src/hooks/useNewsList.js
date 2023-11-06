import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsListApi } from "../services/news";
import { dispatchNewsList } from "../store/actions/newsAction";

export const useNewsList = () => {
  const dispatch = useDispatch();
  const hookState = useSelector((state) => state.newsReducer);
  const [newsList, setnewsList] = useState([]);

  useEffect(() => {
    getNewsList();
  }, [newsList]);

  const getNewsList = async () => {
    if (hookState.newsList.length === 0) {
      const data = await fetchNewsListApi();
      const result = await dispatch(dispatchNewsList(data.data));
      // await console.log("using state 0");
      await setnewsList(data.data);

      return;
    }
    await setnewsList(hookState.newsList);
    // console.log("using state 1");
    return;
  };
  return newsList;
};
