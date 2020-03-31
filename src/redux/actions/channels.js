import { GET_CHANNELS } from "./actionTypes";
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
