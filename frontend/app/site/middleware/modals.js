import { clearModalWindows  } from 'redux-promising-modals';
import { LOCATION_CHANGE } from 'connected-react-router'


export const modalsClearMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  if (action.type == LOCATION_CHANGE && getState().modals.types.length) {
    dispatch(clearModalWindows())
  }
  return next(action)
}
