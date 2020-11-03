import { combineReducers } from 'redux'
import formReducer from 'redux-form/es/reducer'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { modalsReducer } from 'redux-promising-modals';

import securityReducer from 'security/reducer'
import notificationReducer from 'site/reducers/notification'
import localeReducer from 'site/reducers/language'

import { createReducer as createReducerORM } from 'redux-orm'
import orm from 'orm'

export default function createReducer(injectedReducers, history) {
  return combineReducers({
    security: securityReducer,
    notification: notificationReducer,
    locale: localeReducer,

    form: formReducer,
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    modals: modalsReducer,

    entities: createReducerORM(orm),

    ...injectedReducers,
  })
}
