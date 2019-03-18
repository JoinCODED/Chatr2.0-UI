import axios from "axios";
import jwt_decode from "jwt-decode";
import { resetErrors } from "./errors";

import * as actionTypes from "./actionTypes";

// import { setErrors } from "../errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.token;
    console.log("[authentication.js] token", token);

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp > currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const loginAndSignup = (userData, history, type) => {
  //console.log("[authentication.js]", type);
  return async dispatch => {
    try {
      const res = await instance.post(type + "/", userData);
      const user = res.data;
      //console.log("[authentication.js] user", user);
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/private");
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};
