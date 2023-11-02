import {
  FETCH_BOOKING_LIST,
  FETCH_BOOKING_STATE,
  FETCH_LOGOUT_BOOKING,
} from "../types/bookingType";

export const dispatchBookingList = (data) => {
  return {
    type: FETCH_BOOKING_LIST,
    payload: data,
  };
};

export const dispatchBookingState = (data) => {
  return {
    type: FETCH_BOOKING_STATE,
    payload: data,
  };
};

export const dispatchLogoutBooking = (data) => {
  return {
    type: FETCH_LOGOUT_BOOKING,
    payload: data,
  };
};
