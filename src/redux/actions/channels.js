import { GET_CHANNELS, ADD_CHANNEL } from "./actionTypes";
import instance from "./instance";

export const getChannels = () => {
  return async dispatch => {
    try {
      const response = await instance.get("channels/");
      const channels = response.data;
      dispatch({
        type: GET_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const addChannel = name => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", name);
      const newChannel = res.data;

      dispatch({
        type: ADD_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error);
    }
  };
};
