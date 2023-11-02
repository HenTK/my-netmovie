import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { movieReducer } from "./reducers/movieReducer";
import thunk from "redux-thunk";
import { cinemaReducer } from "./reducers/cinemaReducer";
import { bookingReducer } from "./reducers/bookingReducer";
import { loginReducer } from "./reducers/loginReducer";
import { newsReducer } from "./reducers/newsReducer";

const rootReducer = combineReducers({
  movieReducer,
  cinemaReducer,
  bookingReducer,
  loginReducer,
  newsReducer,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
