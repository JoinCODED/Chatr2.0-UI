import { ADD_CHANNEL } from "./actionTypes";

export const addChannel = newChannel => {
  return {
    type: ADD_CHANNEL,
    payload: newChannel
  };
};
