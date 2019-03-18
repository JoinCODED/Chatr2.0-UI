import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const sendMessage = (channelId,message) => {
  return async dispatch => {
    try {
      const res = await instance.post(`channels/${channelId}/send/`, message);
      const messages = res.data;
    } catch (error) {
      console.error(error.response.data);
    }
  };
};