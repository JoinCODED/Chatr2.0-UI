import { VIEW_CHANNEL } from "./actionTypes";
import instance from "./instance";

export const viewChannel = channelID => async dispatch => {
  dispatch({ type: VIEW_CHANNEL, payload: null });
  try {
    const res = await instance.get(`channels/${channelID}/`);
    const channel = res.data;
    dispatch({
      type: VIEW_CHANNEL,
      payload: channel
    });
  } catch (error) {
    console.error(error);
  }
};
