import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS } from '../constants'

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
