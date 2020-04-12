import { ADD_CHANNEL, FETCH_CHANNELS } from "../actions/actionTypes";

import { setErrors } from "./errors";

import instance from "./instance";

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await instance.get("channels/");
      const channels = res.data;
      dispatch({
        type: FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      dispatch(setErrors(error));
    }
  };
};

export const addChannel = (newChannelName, resetForm, history) => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", newChannelName);

      const channel = res.data;
      dispatch(setErrors());

      dispatch({
        type: ADD_CHANNEL,
        payload: channel
      });
      resetForm();
    } catch (error) {
      dispatch(setErrors(error));
    }
  };
};
