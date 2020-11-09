import { CLEAR_MODAL_WINDOWS } from 'redux-promising-modals';
import { LOCATION_CHANGE } from 'connected-react-router'


export const modalClearMiddleware = ({ getState, dispatch }) => (next) => (action) => {
    console.log("action.type: ", action.type)
    console.log("getState().modals.types.length: ", getState().modals.types.length)
  if (action.type == LOCATION_CHANGE && getState().modals.types.length) {
    dispatch(CLEAR_MODAL_WINDOWS())
  }
  return next(action)
}
