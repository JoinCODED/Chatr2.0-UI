import { SET_MESSAGE, ADD_MESSAGE, CLEAR_MESSAGES } from ".//actionTypes";
import { setErrors } from "./errors";
import instance from "./instance";

export const setMessage = (channelID, timestamp) => async dispatch => {
  try {
    const res = await instance.get(
      `channels/${channelID}/?latest=${timestamp}`
    );
    const channel = res.data;
    dispatch({
      type: SET_MESSAGE,
      payload: channel
    });
  } catch (error) {
    dispatch(setErrors(error));
  }
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};

export const sendMessages = (channelID, message, user, resetForm) => {
  return async dispatch => {
    try {
      const res = await instance.post(`channels/${channelID}/send/`, message);

      const messageRes = res.data;

      const messageDetail = {
        id: user.id,
        username: user.username,
        message: messageRes,
        channel: channelID
      };

      dispatch({
        type: ADD_MESSAGE,
        payload: messageDetail
      });
      resetForm();
    } catch (error) {
      dispatch(setErrors(error));
    }
  };
};
