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

export function updateImage(path,filename) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_IMAGE,
      payload: {
        image: {
          path,
          filename
        }
      }
    })
  }
}

export function emptyImage() {
  return updateImage('','');
}
