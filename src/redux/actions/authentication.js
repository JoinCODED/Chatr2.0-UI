import jwt_decode from "jwt-decode";

import instance from "./instance";

import { SET_CURRENT_USER, SET_ERRORS } from "./actionTypes";
import { getChannels } from "./channels";

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = jwt_decode(token);
    if (user.exp >= Date.now() / 1000) return setCurrentUser(token);
  }
  return setCurrentUser();
};

export const setAuthHeader = token => {
  if (token) {
    localStorage.setItem("token", token);
    instance.defaults.headers.Authorization = `jwt ${token}`;
  } else {
    delete instance.defaults.headers.Authorization;
    localStorage.removeItem("token");
  }
};

export const login = userData => async dispatch => {
  try {
    const response = await instance.post("login/", userData);
    const { token } = response.data;
    dispatch(setCurrentUser(token));
    dispatch(getChannels());
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const signup = userData => async dispatch => {
  try {
    const response = await instance.post("signup/", userData);
    const { token } = response.data;
    dispatch(setCurrentUser(token));
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => setCurrentUser();

export const setCurrentUser = token => {
  setAuthHeader(token);
  const user = token ? jwt_decode(token) : null;
  return { type: SET_CURRENT_USER, payload: user };
};
