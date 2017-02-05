// @flow
import * as actionTypes from '../constants/actionTypes.js';

export function updateFiles(images, directories) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_FILES,
      payload: {
        images, directories
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

export function emptyFiles() {
  return updateFiles([],[]);
}