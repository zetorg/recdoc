import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS } from '../constants'


const initialState = {
    list: []
};

export default function update(state = initialState, action) {
    switch (action.type) {
        case GET_DOCTORS_REQUEST:
            return { ...state, list: [] };

        case GET_DOCTORS_SUCCESS:
            return { ...state, list: action.data };

        default:
            return state;
    }


}
