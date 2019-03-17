import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

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
		const token = localStorage.getItem("token");

		if (token) {
			const currentTime = Date.now() / 1000;

			// Decode token and get user info
			const user = jwt_decode(token);

			console.log((user.exp - currentTime) / 60);

			// Check token expiration
			if (user.exp >= currentTime) {
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

export const login = (userData, history) => {
	return async dispatch => {
		try {
			let response = await instance.post("/login/", userData);
			let user = response.data;
			let decodedUser = jwt_decode(user.token);
			setAuthToken(user.token);
			dispatch(setCurrentUser(decodedUser));
		  // make sure to passe the history obj to the func
		  history.push("/welcome");
		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};

export const signup = (userData, history) => {
	return async dispatch => {
		try {
			let response = await instance.post("/signup/", userData);
			let user = response.data;
			let decodedUser = jwt_decode(user.token);
			setAuthToken(user.token);
			dispatch(setCurrentUser(decodedUser));
			// make sure to passe the history obj to the func
			history.push("/welcome");
		} catch (error) {
		  	dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};

export const logout = () => {
	setAuthToken();
	return setCurrentUser();
};

const setCurrentUser = user => ({
	type: actionTypes.SET_CURRENT_USER,
	payload: user
});