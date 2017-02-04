import * as actionTypes from '../constants/actionTypes.js';

const initialState = {
	files: [],
	currentPath: '',
	pathHistory: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.UPDATE_FILES:
			return {...state, files: action.payload.files}
		case actionTypes.UPDATE_CURRENT_PATH:
			return {...state, currentPath: action.payload.files.currentPath}
		default:
			return {...state}
	}
}