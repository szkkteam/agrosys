import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { modalsMiddleware } from 'redux-promising-modals';
import createSagaMiddleware from 'redux-saga'

import createReducer from 'reducers'
import getSagas from 'sagas'
import { notificationClearMiddleware } from 'site/middleware/notification'
import { modalsClearMiddleware } from 'site/middleware/modals'

const isDev = process.env.NODE_ENV !== 'production'
const hasWindowObject = typeof window === 'object'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    loadingBarMiddleware({ promiseTypeSuffixes: ['REQUEST', 'FULFILL'] }),
    notificationClearMiddleware,
    modalsClearMiddleware,
    modalsMiddleware,
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const composeEnhancers =
    isDev && hasWindowObject && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const store = createStore(
    createReducer({}),
    initialState,
    composeEnhancers(...enhancers)
  )

  // extensions
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  let runningSagas = sagaMiddleware.run(function *() {
    yield getSagas()
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextCreateReducer = require('./reducers').default
      store.replaceReducer(nextCreateReducer(store.injectedReducers))
    })

    module.hot.accept('./sagas', () => {
      const nextGetSagas = require('./sagas').default
      runningSagas.cancel()
      runningSagas.done.then(() => {
        runningSagas = sagaMiddleware.run(function *() {
          yield nextGetSagas()
        })
      })
    })
  }

  return store
}
