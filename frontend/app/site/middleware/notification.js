import { closeNotification } from 'site/actions'
import { LOCATION_CHANGE } from 'react-router-redux'


export const notificationClearMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  if (action.type == LOCATION_CHANGE && getState().notification.notifications.length) {
    dispatch(closeNotification())
  }
  return next(action)
}
