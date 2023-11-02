import {
  FETCH_BOOKING_LIST,
  FETCH_BOOKING_STATE,
  FETCH_LOGOUT_BOOKING,
} from "../types/bookingType";

const DEFAULT_STATE = {
  bookingList: [],
  bookingDetail: [],
  bookingState: [],
};

export const bookingReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BOOKING_LIST:
      {
        state.bookingList = JSON.parse(JSON.stringify(payload));
      }
      break;
    case FETCH_BOOKING_STATE:
      {
        console.log(payload);
        const data = JSON.parse(JSON.stringify(state.bookingState));
        const idx = data.findIndex((ele) => payload.id === ele.id);
        if (idx === -1) {
          console.log("chưa có phim rạp này được đặt");
          data.push(payload);
          state.bookingState = data;
          break;
        }
        data[idx] = payload;
        console.log("Phim này đang được đặt vé và chỗ", data);
        state.bookingState = data;
      }
      break;
    case FETCH_LOGOUT_BOOKING:
      {
        state.bookingDetail = [];
        state.bookingState = [];
        console.log("Logout booking reducer");
      }
      break;
    default:
      break;
  }
  return { ...state };
};
