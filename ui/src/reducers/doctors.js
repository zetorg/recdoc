import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, CHANGE_DOCTOR_RECORD_FIELD_VALUE,
    CLEAR_DOCTOR_RECORD, GET_DOCTOR_DATE_INTERVALS_SUCCESS
} from '../constants'


const initialState = {
    list: [],
    dateTimeIntervals: [],
    record: {
        id: null,
        date: null,
        time_interval: 0,
        user_title: null,
        user_phone: null,
        comment: null
    }
};

export default function update(state = initialState, action) {
    let record = state.record;

    switch (action.type) {
        case GET_DOCTORS_REQUEST:
            return { ...state, list: [] };

        case GET_DOCTORS_SUCCESS:
            return { ...state, list: action.data };

        case CLEAR_DOCTOR_RECORD:
            return { ...state, record: {
                id: null,
                date: null,
                time_interval: 0,
                user_title: null,
                user_phone: null,
                comment: null
            }};

        case CHANGE_DOCTOR_RECORD_FIELD_VALUE:
            if (action.name in record)
            {
                record[action.name] = action.value != undefined ? action.value : action.event != undefined ? action.event.target.value : action.index;
            }

            return { ...state, record: record };

        case GET_DOCTOR_DATE_INTERVALS_SUCCESS:
            if (action.data.length > 0) {
                record.time_interval = action.data[0].id;
            }

            return {...state, dateTimeIntervals: action.data, record: record };

        default:
            return state;
    }


}
