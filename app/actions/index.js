// @flow
import * as actionTypes from '../constants/actionTypes.js';

export function updateFiles(files) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_FILES,
      payload: {
        files
      }
    });
  };
}

export function updatePath(path) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_PATH,
      payload: {
        path
      }
    });
  };
}