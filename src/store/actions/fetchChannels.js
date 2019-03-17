import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://private-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await instance.get("channels/");
      const channels = res.data;
      dispatch({ type: actionTypes.SET_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
    }
  };
};