import axios from "axios";

import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

// import { setErrors } from "../errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const createChannels = (userData, history) => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", userData);
      const newChannel = res.data; // return token encodeing actual user
      dispatch(resetErrors()); //send empty payload to reducer and reducer make erorr is empty
      dispatch({
        type: actionTypes.CREATE_CHANNELS,
        payload: newChannel
      });
      history.push("/private");
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
export const fetchChannels = () => {
  return async dispatch => {
    try {
      const request = await instance.get("channels/");
      const responce = request.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: responce
      });
    } catch (err) {}
  };
};
