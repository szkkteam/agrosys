import { createRoutine } from 'actions'

export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const enqueueNotification = (notification) => {
  const key = notification.options && notification.options.key

  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      notification: {
        ...notification,
        key: key || new Date().getTime() + Math.random()
      }
    }
  }
}

export const closeNotification = key => ({
  type: CLOSE_NOTIFICATION,
  payload: {
    dismisAll: !key, // dismiss all if no key has been defined
    key,
  }
})

export const removeNotification = key => ({
  type: REMOVE_NOTIFICATION,
  payload: {
    key,
  }
})

export const contact = createRoutine('site/CONTACT')
