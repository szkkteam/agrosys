import { combineReducers } from 'redux'
import formReducer from 'redux-form/es/reducer'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { modalsReducer } from 'redux-promising-modals';

import securityReducer from 'security/reducer'
import notificationReducer from 'site/reducers/notification'
import localeReducer from 'site/reducers/language'
import history from 'utils/history'

import { createReducer as createReducerORM } from 'redux-orm'
import schema from 'farmApp/schema'

export default function createReducer(injectedReducers) {
  return combineReducers({
    security: securityReducer,
    notification: notificationReducer,
    locale: localeReducer,

    form: formReducer,
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    modals: modalsReducer,

    entities: createReducerORM(schema),

    ...injectedReducers,
  })
}
