import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

import checkStore from './checkStore'
import createReducer from 'reducers'
import history from 'utils/history'

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store)

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    )

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return

    store.injectedReducers[key] = reducer
    store.replaceReducer(createReducer(store.injectedReducers, history))
  }
}

export default function getInjectors(store) {
  checkStore(store)

  return {
    injectReducer: injectReducerFactory(store, true),
  }
}
