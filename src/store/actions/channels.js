import axios from "axios";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";


const instance = axios.create({
	baseURL: "https://api-chatr.herokuapp.com/"
});


export const getAllChannels = () => {
	return async dispatch => {
		try {
			let response = await instance.get("/channels/");
			let channels = response.data;

			console.log("zerodebug => channels action => getAllChannels => res.data: ". channels)
			dispatch({
				type: actionTypes.GET_ALL_CHANNELS,
				payload: channels,
			})

		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};