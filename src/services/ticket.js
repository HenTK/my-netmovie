import axios from "axios";
import { BASE_URL_TICKET } from "../constants";

export const fetchTicketDetailApi = () => {
  return axios({
    url: `${BASE_URL_TICKET}/QuanLyDatVe`,
    method: "GET",
  });
};

export const updateTicketDetailApi = (data, id) => {
  return axios({
    url: `${BASE_URL_TICKET}/QuanLyDatVe/${id}`,
    method: "PUT",
    data: data,
  });
};
