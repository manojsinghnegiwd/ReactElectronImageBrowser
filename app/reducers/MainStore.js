import * as actionTypes from '../constants/actionTypes.js';

const initialState = {
	directories: [],
	images: [],
	currentPath: '',
	currentImage: {},
	pathHistory: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.UPDATE_FILES:
			return {...state, ...action.payload}
		case actionTypes.UPDATE_CURRENT_PATH:
			return {...state, currentPath: action.payload.path}
		case actionTypes.UPDATE_CURRENT_IMAGE:
			return {...state, currentImage: action.payload.image}
		default:
			return {...state}
	}
}