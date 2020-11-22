import {
    ENQUEUE_NOTIFICATION,
    CLOSE_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from 'site/actions'
  
  
  export const initialState = {
    notifications: [],
  }
  
  export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case ENQUEUE_NOTIFICATION:
        return {
            ...state,
            notifications: [
                ...state.notifications,
                {
                    key: payload.key,
                    ...payload.notification
                }
            ]
        }
  
      case CLOSE_NOTIFICATION:
        return {
          ...state,
          notifications: state.notifications.map(notification => (
              (payload.dismissAll || notification.key === payload.key)
              ? { ...notification, dismissed: true }
              : { ...notification }
          ))
        }
  
      case REMOVE_NOTIFICATION:
        return {
            ...state,
            notifications: state.notifications.filter(
                notification => notification.key !== payload.key
            )
        }
  
      default:
        return state
    }
  }
  
  