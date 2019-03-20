import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api-chatr.herokuapp.com/"
});
let timestamp = "";
export const fetchAllMessages = (channelID) => {

    return async dispatch => {
        try {
            const res = await instance.get(`/channels/${channelID}/?latest=${timestamp}`);
            const messages = res.data;

            if (messages.length) timestamp = messages[messages.length - 1].timestamp
            dispatch({
                type: actionTypes.FETCH_ALL_MESSAGES,
                payload: messages
            })
        } catch (err) {
            // dispatch({
            //     type: actionTypes.SET_ERRORS,
            //     payload: err.response.data
            // });
        }
    };

}
export const PostMessage = (message, channelID) => {
    return async dispatch => {
        try {

            const res = await instance.post(`channels/${channelID}/send/`, message);
            let newmessage = res.data;

            // dispatch(setErrors());
            //fetch(channelID)
            //console.log("channel", channelID)
            dispatch({
                type: actionTypes.POST_MESSAGE,
                payload: newmessage
            });
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: actionTypes.SET_ERRORS,
            //     payload: err.response.data
            // });
        }
    };
};

// export const TimeStamp = (timestamp, channelID) => {
//     return dispatch => {
//         instance.get(`channels/${channelID}/?latest=${timestamp}`)
//             .then(res => res.data)
//             .then(messa =>
//                 dispatch({ type: actionTypes.TIMESTAMP, payload: TimeStamp })
//             )
//             .catch(error => console.error(error));
//     };
// };
