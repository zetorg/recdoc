import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, CHANGE_DOCTOR_RECORD_FIELD_VALUE,
    CLEAR_DOCTOR_RECORD, GET_DOCTOR_DATE_INTERVALS_SUCCESS, GET_SAVE_RECORD_REQUEST,
    GET_SAVE_RECORD_SUCCESS
} from '../constants'

export function getDoctors() {
    return (dispatch) => {
        dispatch({
            type: GET_DOCTORS_REQUEST,
            data: []
        });

        $.ajax({
            url: '/doctor/list',
            type: "GET",
            success: function(list) {
                if (list.data.length > 0)
                {
                    dispatch({
                        type: GET_DOCTORS_SUCCESS,
                        data: list.data
                    })
                }
            }
        });
    }
}

export function clearRecord() {
    return {
        type: CLEAR_DOCTOR_RECORD
    }
}

export function changeRecordFieldValue(name, event, index, value) {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_DOCTOR_RECORD_FIELD_VALUE,
            name: name,
            event: event,
            index: index,
            value: value
        });

        if (name == 'date') {
            $.ajax({
                url: '/doctor/time-intervals',
                type: "GET",
                data: {
                    doctor_id: getState().doctors.record.id,
                    date: formatDate(index)
                },
                dataType: 'json',
                success: function(result) {
                    if (result.data.length > 0)
                    {
                        dispatch({
                            type: GET_DOCTOR_DATE_INTERVALS_SUCCESS,
                            data: result.data
                        })
                    }
                }
            });
        }
    }
}

export function saveRecord(name, event, index, value) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_SAVE_RECORD_REQUEST
        });

        let params = getState().doctors.record;
        params['date'] = formatDate(params['date']);
        $.ajax({
            url: '/record/save',
            type: "GET",
            data: params,
            dataType: 'json',
            success: function(result) {
                if (result.success)
                {
                    dispatch({
                        type: GET_SAVE_RECORD_SUCCESS,
                        data: result.success
                    })
                }
            }
        });
    }
}

function formatDate(date) {
    let now = new Date(date);
    let m = now.getMonth();
    m++;
    let d = now.getDate();
    let y = now.getFullYear();

    return (d < 10 ? '0' : '') + d + '.' + (m < 10 ? '0' : '') + m + '.' + y;
}