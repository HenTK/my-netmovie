import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchMovieList } from "../store/actions/movieAction";
import { LoadingContext } from "../contexts/loading/LoadingContext";

export const useMovieList = () => {
  const dispatch = useDispatch();
  const hookState = useSelector((state) => state.movieReducer);
  const [movieList, setMovieList] = useState([]);
  //là giá trị value [state, setState] mà useContext trả về
  const [LoadingState, setLoadingState] = useContext(LoadingContext);

  //khi chạy, state chưa kịp thay đổi đã render giao diện, làm giao diện mất đi
  //ta sẽ render lại giao diện khi state thay đổi
  useEffect(() => {
    getMovieList();
  }, [movieList]);
  //có thể thêm [movieList] để chặn lại quá trình không load được dữ liệu api khi mới vào
  //nhưng làm vậy sẽ chậm hiệu suất trang khi sử dụng

  const getMovieList = async () => {
    setLoadingState({
      isLoading: true,
    });
    if (hookState.movieList.length == 0) {
      const result = await dispatch(dispatchMovieList());
    }
    setMovieList(hookState.movieList);
    setLoadingState({
      isLoading: false,
    });
  };
  return movieList;
};
