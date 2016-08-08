import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, CHANGE_DOCTOR_RECORD_FIELD_VALUE,
    CLEAR_DOCTOR_RECORD, GET_DOCTOR_DATE_INTERVALS_SUCCESS, GET_SAVE_RECORD_REQUEST,
    GET_SAVE_RECORD_SUCCESS, CLOSE_MODAL_SAVE_RECORD, GET_DOCTOR_BUSY_DATES_REQUEST,
    GET_DOCTOR_BUSY_DATES_SUCCESS
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

export function closeModalSaveRecord() {
    return {
        type: CLOSE_MODAL_SAVE_RECORD
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

export function getBusyDates(doctor_id) {
    return (dispatch) => {
        dispatch({
            type: GET_DOCTOR_BUSY_DATES_REQUEST
        });

        $.ajax({
            url: '/doctor/busy-dates',
            type: "GET",
            data: {
                doctor_id: doctor_id
            },
            dataType: 'json',
            success: function(result) {
                if (result.data.length > 0)
                {
                    dispatch({
                        type: GET_DOCTOR_BUSY_DATES_SUCCESS,
                        dates: result.data
                    })
                }
            }
        });
    }
}

export function saveRecord(params) {
    return (dispatch) => {
        dispatch({
            type: GET_SAVE_RECORD_REQUEST
        });

        params['date'] = formatDate(params['date']);
        $.ajax({
            url: '/record/save',
            type: "POST",
            data: params,
            dataType: 'json',
            success: function(result) {
                if (result.success)
                {
                    dispatch({
                        type: GET_SAVE_RECORD_SUCCESS,
                        success: result.success,
                        msg: 'Вы записаны к врачу'
                    });

                    dispatch({
                        type: CLEAR_DOCTOR_RECORD
                    });
                } else {
                    dispatch({
                        type: GET_SAVE_RECORD_SUCCESS,
                        success: result.success,
                        msg: 'msg' in result ? result.msg : 'Произошла ошибка'
                    });
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