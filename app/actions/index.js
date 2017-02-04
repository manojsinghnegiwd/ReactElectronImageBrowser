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
