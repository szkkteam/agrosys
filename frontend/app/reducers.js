import { combineReducers } from 'redux'
import formReducer from 'redux-form/es/reducer'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import securityReducer from 'security/reducer'
import notificationReducer from 'site/reducers/notification'

import { createReducer as createReducerORM } from 'redux-orm'
import orm from 'orm'

export default function createReducer(injectedReducers) {
  return combineReducers({
    security: securityReducer,
    notification: notificationReducer,

    form: formReducer,
    routing: routerReducer,
    loadingBar: loadingBarReducer,

    entities: createReducerORM(orm),

    ...injectedReducers,
  })
}
