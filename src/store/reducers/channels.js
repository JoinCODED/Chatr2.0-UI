import { FETCH_CHANNELS } from "../actions/actionTypes";
import * as actionTypes from "../actions/actionTypes";


const initialState = {
    channels: [],
    filteredChannels: [],
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return {
                ...state,
                channels: state.channels.concat(action.payload),
                filteredChannels: state.filteredChannels.concat(action.payload),
                loading: false
            };
        case actionTypes.POST_CHANNEL:
            return {
                ...state,
                channels: [action.payload].concat(state.channels)
            };
        default:
            return state;
    }
};

export default reducer;

        // case actionTypes.FETCH_CHANNELS:
        // return {
        //     ...state,
        //     filteredChannels: state.channels.filter(author => {
        //         return `${author.first_name} ${author.last_name}`
        //             .toLowerCase()
        //             .includes(action.payload);
        //     })

        // };
