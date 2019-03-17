import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://private-chatr.herokuapp.com"
});

export const createChannel = channel => {
  console.log(channel);
  return async dispatch => {
    try {
      const res = await instance.post("/channels/create/", channel);
      const newChannel = res.data;
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};