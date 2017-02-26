import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, CHANGE_DOCTOR_RECORD_FIELD_VALUE,
    CLEAR_DOCTOR_RECORD, GET_DOCTOR_DATE_INTERVALS_SUCCESS, GET_SAVE_RECORD_SUCCESS,
    CLOSE_MODAL_SAVE_RECORD, GET_DOCTOR_BUSY_DATES_REQUEST, GET_DOCTOR_BUSY_DATES_SUCCESS,
    GET_RECORDS_SUCCESS, GET_RECORDS_REQUEST, ADD_RECORD
} from '../constants'


const initialState = {
    list: [],
    dateTimeIntervals: [],
    busyDates: [],
    modalSaveRecord: {
        open: false,
        success: true,
        msg: ''
    },
    record: {
        id: null,
        date: null,
        time_interval: 0,
        user_title: null,
        user_phone: '',
        comment: null
    },
    records: []
};

export default function update(state = initialState, action) {
    let record = state.record;

    switch (action.type) {
        case GET_DOCTORS_REQUEST:
            return { ...state, list: [] };

        case GET_DOCTORS_SUCCESS:
            return { ...state, list: action.data };

        case GET_RECORDS_REQUEST:
            return { ...state, records: [] };

        case GET_RECORDS_SUCCESS:
            return { ...state, records: action.data };

        case ADD_RECORD:
            state.records.push(action.data);

            return { ...state, records: state.records };

        case GET_DOCTOR_BUSY_DATES_REQUEST:
            return { ...state, busyDates: [] };

        case GET_DOCTOR_BUSY_DATES_SUCCESS:
            return { ...state, busyDates: action.dates };

        case CLEAR_DOCTOR_RECORD:
            return { ...state, record: {
                id: null,
                date: null,
                time_interval: 0,
                user_title: null,
                user_phone: '',
                comment: null
            }};

        case CHANGE_DOCTOR_RECORD_FIELD_VALUE:
            if (action.name in record)
            {
                let value = action.value != undefined ? action.value : action.event != undefined ? action.event.target.value : action.index;

                if (action.name == 'user_phone') {
                    value = /^(\d){0,11}$/.test(value) ? value : record[action.name];
                }
                record[action.name] = value;
            }

            return { ...state, record: record };

        case GET_DOCTOR_DATE_INTERVALS_SUCCESS:
            if (action.data.length > 0) {
                record.time_interval = action.data[0].id;
            }

            return {...state, dateTimeIntervals: action.data, record: record };

        case GET_SAVE_RECORD_SUCCESS:
            if ( !action.success ) {
                record.date = null;
            }
            return {...state, record: record, modalSaveRecord: {open: true, success: action.success, msg: action.msg} };

        case CLOSE_MODAL_SAVE_RECORD:
            return {...state, modalSaveRecord: {open: false, success: true, msg: ''} };

        default:
            return state;
    }


}
