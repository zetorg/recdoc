import { ADD_APP_PROGRESS, REMOVE_APP_PROGRESS } from '../constants'


const initialState = {
	progress: 0
};

export default function update(state = initialState, action) {
	switch (action.type) {
		case ADD_APP_PROGRESS:
			return { ...state, progress: state.progress + 1 };

		case REMOVE_APP_PROGRESS:
			if ( state.progress > 0 ) {
				return { ...state, progress: state.progress - 1 };
			} else {
				return state;
			}

		default:
			return state;
	}


}
