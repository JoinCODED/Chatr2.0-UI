import decode from "jwt-decode";

import instance from "./instance";

import { SET_CURRENT_USER } from "./actionTypes";

import { setErrors } from "./errors";

export const checkForExpiredToken = () => {};

const setAuthHeader = token => {
  instance.defaults.headers.Authorization = `jwt ${token}`;
};

export const login = userData => async dispatch => {
  try {
    const response = await instance.post("login/", userData);
    const { token } = response.data;
    setAuthHeader(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error);
  }
};

export const signup = userData => async dispatch => {
  try {
    const response = await instance.post("signup/", userData);
    const { token } = response.data;
    setAuthHeader(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {};

const setCurrentUser = token => {};
