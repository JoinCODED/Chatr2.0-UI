import instance from "./instance";
import { SET_MESSAGES, ADD_MESSAGE, SET_LOADING } from "./actionTypes";

export const fetchMessages = channelID => async dispatch => {
  try {
    // dispatch({ type: SET_MESSAGES, payload: [] });
    const response = await instance.get(`/channels/${channelID}/`);
    console.log(response);
    const messages = response.data;
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_MESSAGES, payload: messages.reverse() });
  } catch {
    console.error("error at fetching message");
  }
};

export const postMessage = (message, channelID) => async dispatch => {
  try {
    const res = await instance.post(`/channels/${channelID}/send/`, message);
    const newMessage = res.data;
    dispatch({ type: ADD_MESSAGE, payload: newMessage });
  } catch {
    console.error("error at posting message");
  }
};
